class PALTemplate:
    @staticmethod
    def curriculum_intake() -> str:
        return """You are PAL (Prompt Abstraction Layer), compiling a learner's intent into a curriculum specification.

Analyze the learner's request and produce a structured curriculum specification.

Input: "{raw_input}"

Learner Profile:
- Level: {level}
- Goals: {goals}
- Time Budget: {hours} hours
- Learning Style: {style}
- Preferred Formats: {formats}

Output a JSON curriculum spec with:
- topic: the canonical topic name
- sub_topics: ordered list of sub-topics to cover
- depth: beginner | intermediate | advanced | expert
- estimated_total_hours: integer
- learning_objectives: 3-5 clear objectives
- resource_requirements: what formats are needed
- assessment_strategy: how to verify learning"""


class ResearchTemplate:
    @staticmethod
    def search_query(topic: str, depth: str) -> str:
        return f"""Generate 5 search queries to find the best learning resources for:

Topic: {topic}
Depth: {depth}

For each query, specify:
1. The search string
2. Target platforms (youtube, coursera, udemy, arxiv, blogs, docs, github)
3. What type of resource to prioritize (tutorial, course, paper, article, code)

Format as a JSON array of objects with keys: query, platforms, resource_type, purpose."""


class IndexTemplate:
    @staticmethod
    def taxonomy_prompt(topic: str, resources: list) -> str:
        return f"""Organize these learning resources into a structured taxonomy for: {topic}

Resources: {len(resources)} items

Create a prerequisite-ordered tree structure where:
- Each node represents a concept or skill
- Leaf nodes have resource assignments
- Edges represent "must know before"
- Depth represents specialization level

Return as a JSON hierarchy with: node_id, label, description, prerequisites, child_nodes, resource_indices."""
