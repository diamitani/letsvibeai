import json
from typing import Optional
from src.curriculum_agent.models import (
    Resource,
    SourceTier,
    Platform,
    ResourceType,
    Difficulty,
)
from src.curriculum_agent.pal.templates import ResearchTemplate


class ResearchEngine:
    """
    Layer 1: Research Engine
    Discovers learning resources across all platforms.
    Uses PAL-enhanced queries + optional LLM search augmentation.
    """

    def __init__(self, deepseek_client=None):
        self.client = deepseek_client

    def research(
        self,
        topic: str,
        depth: str = "intermediate",
        platforms: Optional[list[str]] = None,
        max_results: int = 50,
    ) -> list[Resource]:
        queries = self._generate_queries(topic, depth)
        resources = []
        for query_spec in queries:
            platform_filter = platforms or query_spec.get("platforms", [])
            results = self._search_platform(query_spec["query"], platform_filter)
            resources.extend(results)
        deduplicated = self._deduplicate(resources)
        scored = self._score_relevance(deduplicated, topic, depth)
        return scored[:max_results]

    def _generate_queries(self, topic: str, depth: str) -> list[dict]:
        prompt = ResearchTemplate.search_query(topic, depth)
        if self.client:
            try:
                response = self.client.chat(prompt)
                return json.loads(self._extract_json_array(response))
            except Exception:
                pass  # Fall back to default queries
        return [
            {
                "query": f"best {topic} tutorial {depth}",
                "platforms": ["youtube", "udemy", "coursera"],
                "resource_type": "course",
                "purpose": "core learning",
            },
            {
                "query": f"{topic} course curriculum syllabus",
                "platforms": ["coursera", "edx", "udemy"],
                "resource_type": "course",
                "purpose": "structured path",
            },
            {
                "query": f"{topic} research papers survey",
                "platforms": ["arxiv"],
                "resource_type": "paper",
                "purpose": "theoretical depth",
            },
            {
                "query": f"{topic} practical guide tutorial",
                "platforms": ["blog", "youtube", "github"],
                "resource_type": "article",
                "purpose": "hands-on learning",
            },
            {
                "query": f"{topic} best resources documentation",
                "platforms": ["docs", "blog", "newsletter"],
                "resource_type": "documentation",
                "purpose": "reference",
            },
        ]

    def _search_platform(self, query: str, platforms: list[str]) -> list[Resource]:
        if self.client:
            try:
                return self._llm_search(query, platforms)
            except Exception:
                pass  # Fall back to simulated search
        return self._simulated_search(query, platforms)

    def _llm_search(self, query: str, platforms: list[str]) -> list[Resource]:
        prompt = f"""You are a learning resource researcher. Search for the best resources matching:

Query: {query}
Platforms: {", ".join(platforms)}

Return a JSON array of learning resources. For each resource include:
- title: string
- url: string (use realistic placeholder URLs)
- platform: one of {[p.value for p in Platform]}
- resource_type: one of {[r.value for r in ResourceType]}
- source_tier: 1 (academic/authoritative), 2 (professional/editorial), or 3 (community/UGC)
- credibility_score: 0.0 to 1.0
- author: string or null
- description: 1-2 sentence summary
- duration_minutes: integer or null
- difficulty: "beginner", "intermediate", "advanced", or "expert"
- topics: array of relevant topic tags
- prerequisites: array of prerequisite topics

Return ONLY the JSON array, no other text."""
        response = self.client.chat(prompt)
        try:
            data = json.loads(self._extract_json_array(response))
            return [Resource(**item) for item in data]
        except (json.JSONDecodeError, Exception):
            return []

    def _simulated_search(self, query: str, platforms: list[str]) -> list[Resource]:
        topic_words = query.split()
        topic = " ".join(topic_words[:3])
        resources = []
        platform_map = {
            "youtube": (Platform.YOUTUBE, ResourceType.VIDEO),
            "coursera": (Platform.COURSERA, ResourceType.COURSE),
            "udemy": (Platform.UDEMY, ResourceType.COURSE),
            "edx": (Platform.EDX, ResourceType.COURSE),
            "arxiv": (Platform.ARXIV, ResourceType.PAPER),
            "blog": (Platform.BLOG, ResourceType.ARTICLE),
            "github": (Platform.GITHUB, ResourceType.CODE),
            "docs": (Platform.DOCS, ResourceType.DOCUMENTATION),
        }
        # Vary difficulty based on query purpose to get a rich curriculum
        difficulty_by_purpose = {
            "core learning": Difficulty.BEGINNER,
            "structured path": Difficulty.INTERMEDIATE,
            "theoretical depth": Difficulty.ADVANCED,
            "hands-on learning": Difficulty.INTERMEDIATE,
            "reference": Difficulty.BEGINNER,
        }
        # Infer purpose from query
        purpose = "core learning"
        if "research" in query.lower() or "survey" in query.lower() or "paper" in query.lower():
            purpose = "theoretical depth"
        elif "practical" in query.lower() or "guide" in query.lower():
            purpose = "hands-on learning"
        elif "documentation" in query.lower() or "reference" in query.lower():
            purpose = "reference"
        elif "curriculum" in query.lower() or "syllabus" in query.lower():
            purpose = "structured path"

        difficulty = difficulty_by_purpose.get(purpose, Difficulty.INTERMEDIATE)
        tier_by_purpose = {"theoretical depth": SourceTier.TIER_1, "reference": SourceTier.TIER_1,
                          "structured path": SourceTier.TIER_2, "core learning": SourceTier.TIER_2,
                          "hands-on learning": SourceTier.TIER_3}

        for p in platforms[:3]:
            plat_info = platform_map.get(p, (Platform.OTHER, ResourceType.ARTICLE))
            resources.append(
                Resource(
                    title=f"{topic.title()} — {plat_info[1].value.title()} on {p.title()}",
                    url=f"https://{p}.com/learn/{topic.lower().replace(' ', '-')}",
                    platform=plat_info[0],
                    resource_type=plat_info[1],
                    source_tier=tier_by_purpose.get(purpose, SourceTier.TIER_2),
                    credibility_score=0.7,
                    description=f"A {plat_info[1].value} about {topic}",
                    duration_minutes=60
                    if plat_info[1] in [ResourceType.VIDEO, ResourceType.COURSE]
                    else 15,
                    difficulty=difficulty,
                    topics=[topic],
                    prerequisites=[],
                )
            )
        return resources

    def _deduplicate(self, resources: list[Resource]) -> list[Resource]:
        seen = set()
        unique = []
        for r in resources:
            key = (r.title.lower(), r.url)
            if key not in seen:
                seen.add(key)
                unique.append(r)
        return unique

    def _score_relevance(
        self, resources: list[Resource], topic: str, depth: str
    ) -> list[Resource]:
        depth_map = {"beginner": 0, "intermediate": 1, "advanced": 2, "expert": 3}
        target_depth = depth_map.get(depth, 1)
        for r in resources:
            r_dep = depth_map.get(
                r.difficulty.value if r.difficulty else "intermediate", 1
            )
            depth_penalty = abs(target_depth - r_dep) * 0.15
            tier_bonus = {1: 0.2, 2: 0.1, 3: 0.0}[r.source_tier]
            topic_match = (
                1.0 if any(t.lower() in topic.lower() for t in r.topics) else 0.5
            )
            r.credibility_score = min(
                1.0,
                max(
                    0.1,
                    r.credibility_score
                    + tier_bonus
                    + topic_match * 0.1
                    - depth_penalty,
                ),
            )
        resources.sort(key=lambda r: r.credibility_score, reverse=True)
        return resources

    def _extract_json_array(self, text: str) -> str:
        start = text.find("[")
        end = text.rfind("]")
        if start != -1 and end != -1:
            return text[start : end + 1]
        return text
