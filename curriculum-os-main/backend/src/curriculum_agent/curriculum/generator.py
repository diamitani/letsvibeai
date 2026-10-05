import json
from src.curriculum_agent.models import (
    LearnerProfile,
    Resource,
    MasterIndex,
    Curriculum,
    Module,
    Lesson,
    Difficulty,
    LearningStyle,
)
from src.curriculum_agent.pal.compiler import PALCompiler


class CurriculumGenerator:
    """
    Layer 3: Curriculum Generator
    PAL-compiles learner profiles into personalized curricula.
    Sequences resources, generates custom bridging content, and builds assessments.
    """

    def __init__(self, deepseek_client=None):
        self.client = deepseek_client
        self.pal = PALCompiler(deepseek_client)

    def generate(self, index: MasterIndex, learner: LearnerProfile) -> Curriculum:
        pal_result = self.pal.compile(learner.topic, learner)
        modules = self._build_modules(index, learner, pal_result)
        objectives = self._extract_objectives(modules)
        gaps = self._find_gaps(index, modules)
        custom_content = self._fill_gaps(gaps, learner, index)
        if custom_content:
            for gap_topic, content in custom_content.items():
                for module in modules:
                    for lesson in module.lessons:
                        if (
                            gap_topic in lesson.title.lower()
                            or gap_topic in " ".join(lesson.objectives).lower()
                        ):
                            lesson.custom_content = content
        total_hours = sum(m.estimated_hours for m in modules)
        curriculum = Curriculum(
            learner_id=learner.id,
            topic=learner.topic,
            total_estimated_hours=round(total_hours, 1),
            learning_objectives=objectives,
            modules=modules,
            assessment_milestones=self._build_assessment_milestones(modules),
            coverage_gaps=list(gaps.keys()),
            recommended_next_topics=self._recommend_next(index, learner),
        )
        return curriculum

    def _build_modules(
        self, index: MasterIndex, learner: LearnerProfile, pal_result: dict
    ) -> list[Module]:
        enhanced = pal_result.get("enhanced_instruction", "")
        prompt = f"""Design a personalized curriculum as a JSON array of modules.

Context: {enhanced}

Learner Level: {learner.current_level.value}
Goals: {", ".join(learner.goals)}
Time Budget: {learner.available_time_hours} hours
Learning Style: {learner.learning_style.value}

Available Resources ({len(index.resources)} total):
{
            json.dumps(
                [
                    {
                        "id": r.id,
                        "title": r.title,
                        "type": r.resource_type.value,
                        "difficulty": r.difficulty.value if r.difficulty else None,
                        "topics": r.topics,
                        "duration": r.duration_minutes,
                    }
                    for r in index.resources[:30]
                ],
                indent=2,
            )
        }

Return a JSON array of modules, each with:
- title: string
- order: integer
- estimated_hours: float
- objectives: array of strings
- lessons: array of objects with: title, order, objectives (array), resource_ids (array matching resource ids above), exercises (array of strings), estimated_minutes (integer)

Allocate time proportionally. Earlier modules should be foundational."""
        if self.client:
            try:
                response = self.client.chat(prompt)
                data = json.loads(self._extract_json_array(response))
                return [Module(**m) for m in data]
            except Exception:
                pass  # Fall back to default modules
        return self._default_modules(index, learner)

    def _default_modules(
        self, index: MasterIndex, learner: LearnerProfile
    ) -> list[Module]:
        beginner_resources = [
            r
            for r in index.resources
            if r.difficulty and r.difficulty == Difficulty.BEGINNER
        ]
        intermediate_resources = [
            r
            for r in index.resources
            if r.difficulty and r.difficulty == Difficulty.INTERMEDIATE
        ]
        advanced_resources = [
            r
            for r in index.resources
            if r.difficulty and r.difficulty in [Difficulty.ADVANCED, Difficulty.EXPERT]
        ]
        total_hours = learner.available_time_hours
        modules = []
        if beginner_resources:
            hours = total_hours * 0.35
            modules.append(
                Module(
                    title="Foundations",
                    order=1,
                    estimated_hours=round(hours, 1),
                    objectives=[
                        f"Understand core concepts of {learner.topic}",
                        "Build mental models for key principles",
                    ],
                    lessons=[
                        Lesson(
                            title=f"Introduction to {learner.topic}",
                            order=1,
                            objectives=[f"Define {learner.topic} and its importance"],
                            resource_ids=[r.id for r in beginner_resources[:3]],
                            exercises=["Self-assessment quiz"],
                            estimated_minutes=60,
                        ),
                        Lesson(
                            title="Core Principles",
                            order=2,
                            objectives=["Understand fundamental mechanisms"],
                            resource_ids=[r.id for r in beginner_resources[3:6]],
                            exercises=["Concept mapping exercise"],
                            estimated_minutes=90,
                        ),
                    ],
                )
            )
        if intermediate_resources:
            hours = total_hours * 0.40
            modules.append(
                Module(
                    title="Core Concepts & Practice",
                    order=2,
                    estimated_hours=round(hours, 1),
                    objectives=[
                        f"Apply {learner.topic} concepts to real problems",
                        "Build practical skills through exercises",
                    ],
                    lessons=[
                        Lesson(
                            title="Hands-on Practice",
                            order=1,
                            objectives=["Apply concepts in practical scenarios"],
                            resource_ids=[r.id for r in intermediate_resources[:4]],
                            exercises=["Implementation exercise"],
                            estimated_minutes=120,
                        ),
                    ],
                )
            )
        if advanced_resources:
            hours = total_hours * 0.25
            modules.append(
                Module(
                    title="Advanced Topics & Mastery",
                    order=len(modules) + 1,
                    estimated_hours=round(hours, 1),
                    objectives=[
                        "Master advanced concepts",
                        "Complete a capstone project",
                    ],
                    lessons=[
                        Lesson(
                            title="Advanced Concepts",
                            order=1,
                            objectives=["Understand cutting-edge developments"],
                            resource_ids=[r.id for r in advanced_resources[:3]],
                            exercises=["Advanced problem set"],
                            estimated_minutes=90,
                        ),
                        Lesson(
                            title="Capstone Project",
                            order=2,
                            objectives=["Synthesize all learning into a project"],
                            resource_ids=[r.id for r in advanced_resources[3:5]],
                            exercises=["Build and present your capstone"],
                            estimated_minutes=120,
                        ),
                    ],
                )
            )
        return modules

    def _extract_objectives(self, modules: list[Module]) -> list[str]:
        objectives = []
        for m in modules:
            objectives.extend(m.objectives)
        return objectives[:8]

    def _find_gaps(self, index: MasterIndex, modules: list[Module]) -> dict:
        gaps = {}
        all_topic_words = set(t.lower() for r in index.resources for t in r.topics)
        for module in modules:
            for objective in module.objectives:
                covered = any(
                    word in all_topic_words
                    for word in objective.lower().split()
                    if len(word) > 4
                )
                if not covered:
                    gaps[objective] = f"No resources directly address: {objective}"
        if index.confidence < 0.5:
            gaps["research_coverage"] = (
                f"Overall research confidence is low ({index.confidence}). Consider broadening the search."
            )
        return gaps

    def _fill_gaps(
        self, gaps: dict, learner: LearnerProfile, index: MasterIndex
    ) -> dict:
        if not gaps or not self.client:
            return {}
        custom_content = {}
        for i, (gap_topic, description) in enumerate(gaps.items()):
            if i >= 3:
                break
            content = self.pal.generate_custom_content(
                gap_topic, description, learner.current_level.value
            )
            custom_content[gap_topic] = content
        return custom_content

    def _build_assessment_milestones(self, modules: list[Module]) -> list[str]:
        milestones = []
        for module in modules:
            if module.lessons:
                milestones.append(
                    f"End of {module.title}: Complete all exercises and self-assess against objectives"
                )
        milestones.append(
            "Final: Complete capstone project and review all learning objectives"
        )
        return milestones

    def _recommend_next(self, index: MasterIndex, learner: LearnerProfile) -> list[str]:
        all_topics = set()
        for r in index.resources:
            all_topics.update(r.topics)
        current_words = set(learner.topic.lower().split())
        recommendations = []
        for t in all_topics:
            t_words = set(t.lower().split())
            overlap = len(current_words & t_words)
            if overlap > 0 and t.lower() not in learner.topic.lower():
                recommendations.append(t)
        return recommendations[:5]

    def _extract_json_array(self, text: str) -> str:
        start = text.find("[")
        end = text.rfind("]")
        if start != -1 and end != -1:
            return text[start : end + 1]
        return text
