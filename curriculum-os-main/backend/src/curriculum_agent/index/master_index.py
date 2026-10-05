import json
from collections import defaultdict
from typing import Any
from src.curriculum_agent.models import Resource, MasterIndex, SourceTier


class MasterIndexBuilder:
    """
    Layer 2: Master Index
    Organizes discovered resources into a structured, queryable taxonomy.
    Supports cross-referencing, tagging, and multi-format export.
    """

    def __init__(self, deepseek_client=None):
        self.client = deepseek_client

    def build(self, topic: str, resources: list[Resource]) -> MasterIndex:
        taxonomy = self._build_taxonomy(topic, resources)
        index = MasterIndex(
            topic=topic,
            resources=resources,
            taxonomy=taxonomy,
            total_count=len(resources),
            by_tier=self._count_by_tier(resources),
            by_platform=self._count_by_platform(resources),
            confidence=self._calculate_confidence(resources),
        )
        return index

    def _build_taxonomy(self, topic: str, resources: list[Resource]) -> dict:
        all_topics = set()
        for r in resources:
            all_topics.update(r.topics)
        if self.client and all_topics:
            try:
                return self._llm_taxonomy(topic, list(all_topics), resources)
            except Exception:
                pass
        return self._default_taxonomy(topic, resources)

    def _llm_taxonomy(
        self, topic: str, topics: list[str], resources: list[Resource]
    ) -> dict:
        prompt = f"""Create a learning taxonomy for '{topic}' based on these available topics and resources.

Topics: {", ".join(topics[:20])}
Resources: {len(resources)} total

Return a JSON hierarchy where:
- Each node has: id, label, description, prerequisites (list of node ids), child_nodes (list of node objects)
- The root node is the topic itself
- Prerequisites must come before dependent concepts
- Leaf nodes can include resource references

Return ONLY valid JSON."""
        response = self.client.chat(prompt)
        try:
            return json.loads(self._extract_json(response))
        except (json.JSONDecodeError, Exception):
            return self._default_taxonomy(topic, resources)

    def _default_taxonomy(self, topic: str, resources: list[Resource]) -> dict:
        resources_by_difficulty = defaultdict(list)
        for r in resources:
            diff = r.difficulty.value if r.difficulty else "intermediate"
            resources_by_difficulty[diff].append(r.id)

        return {
            "id": topic.lower().replace(" ", "_"),
            "label": topic,
            "description": f"Complete learning path for {topic}",
            "prerequisites": [],
            "child_nodes": [
                {
                    "id": "foundations",
                    "label": "Foundations",
                    "prerequisites": [],
                    "resource_count": len(resources_by_difficulty.get("beginner", [])),
                    "resources": resources_by_difficulty.get("beginner", []),
                },
                {
                    "id": "core_concepts",
                    "label": "Core Concepts",
                    "prerequisites": ["foundations"],
                    "resource_count": len(
                        resources_by_difficulty.get("intermediate", [])
                    ),
                    "resources": resources_by_difficulty.get("intermediate", []),
                },
                {
                    "id": "advanced",
                    "label": "Advanced Topics",
                    "prerequisites": ["core_concepts"],
                    "resource_count": len(resources_by_difficulty.get("advanced", []))
                    + len(resources_by_difficulty.get("expert", [])),
                    "resources": resources_by_difficulty.get("advanced", [])
                    + resources_by_difficulty.get("expert", []),
                },
            ],
        }

    def export_json(self, index: MasterIndex) -> str:
        return index.model_dump_json(indent=2)

    def export_markdown(self, index: MasterIndex) -> str:
        lines = [f"# Master Index: {index.topic}", ""]
        lines.append(f"**Total Resources:** {index.total_count}")
        lines.append(f"**Confidence:** {index.confidence:.2f}")
        lines.append(f"**Generated:** {index.created_at}")
        lines.append("")
        lines.append("## By Tier")
        for tier, count in sorted(index.by_tier.items()):
            lines.append(f"- Tier {tier}: {count}")
        lines.append("")
        lines.append("## By Platform")
        for platform, count in sorted(index.by_platform.items()):
            lines.append(f"- {platform}: {count}")
        lines.append("")
        lines.append("## Resources")
        for i, r in enumerate(index.resources, 1):
            tier_label = {1: "📚", 2: "📰", 3: "💬"}.get(r.source_tier, "📄")
            diff = f"[{r.difficulty.value}]" if r.difficulty else ""
            lines.append(f"{i}. {tier_label} **{r.title}** {diff}")
            lines.append(
                f"   {r.url} | Tier {r.source_tier} | {r.credibility_score:.2f}"
            )
            if r.description:
                lines.append(f"   _{r.description}_")
            lines.append("")
        return "\n".join(lines)

    def export_csv(self, index: MasterIndex) -> str:
        import io
        import csv

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(
            [
                "title",
                "url",
                "platform",
                "type",
                "tier",
                "credibility",
                "difficulty",
                "duration_minutes",
                "topics",
            ]
        )
        for r in index.resources:
            writer.writerow(
                [
                    r.title,
                    r.url,
                    r.platform.value,
                    r.resource_type.value,
                    r.source_tier,
                    r.credibility_score,
                    r.difficulty.value if r.difficulty else "",
                    r.duration_minutes or "",
                    "; ".join(r.topics),
                ]
            )
        return output.getvalue()

    def _count_by_tier(self, resources: list[Resource]) -> dict:
        counts = defaultdict(int)
        for r in resources:
            counts[f"tier_{r.source_tier}"] += 1
        return dict(counts)

    def _count_by_platform(self, resources: list[Resource]) -> dict:
        counts = defaultdict(int)
        for r in resources:
            counts[r.platform.value] += 1
        return dict(counts)

    def _calculate_confidence(self, resources: list[Resource]) -> float:
        if not resources:
            return 0.0
        tier1_count = sum(1 for r in resources if r.source_tier == SourceTier.TIER_1)
        tier2_count = sum(1 for r in resources if r.source_tier == SourceTier.TIER_2)
        tier3_count = sum(1 for r in resources if r.source_tier == SourceTier.TIER_3)
        total = len(resources)
        score = (tier1_count * 1.0 + tier2_count * 0.75 + tier3_count * 0.4) / total
        return round(min(1.0, score), 2)

    def _extract_json(self, text: str) -> str:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1:
            return text[start : end + 1]
        return text
