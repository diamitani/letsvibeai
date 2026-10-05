import argparse
import json
from src.curriculum_agent.deepseek_client import DeepSeekClient
from src.curriculum_agent.research.engine import ResearchEngine
from src.curriculum_agent.index.master_index import MasterIndexBuilder
from src.curriculum_agent.curriculum.generator import CurriculumGenerator
from src.curriculum_agent.models import LearnerProfile, Difficulty, LearningStyle
from src.curriculum_agent.config import config


def main():
    parser = argparse.ArgumentParser(
        description="CurriculumOS — AI Curriculum Architect"
    )
    parser.add_argument("--topic", required=True, help="Topic to learn")
    parser.add_argument(
        "--level",
        default="intermediate",
        choices=["beginner", "intermediate", "advanced", "expert"],
    )
    parser.add_argument("--goals", nargs="+", default=[], help="Learning goals")
    parser.add_argument(
        "--hours", type=float, default=20.0, help="Available time in hours"
    )
    parser.add_argument(
        "--style",
        default="balanced",
        choices=["project-based", "theory-first", "balanced"],
    )
    parser.add_argument("--output", default="curriculum.json", help="Output file path")
    parser.add_argument("--verify", action="store_true", help="Verify configuration")

    args = parser.parse_args()

    if args.verify:
        checks = config.verify()
        for check in checks:
            print(check)
        return

    print(f"🔍 Researching: {args.topic}")
    client = DeepSeekClient()
    engine = ResearchEngine(client)
    resources = engine.research(args.topic, args.level)

    print(f"📊 Building index: {len(resources)} resources found")
    builder = MasterIndexBuilder(client)
    index = builder.build(args.topic, resources)

    print(f"🧠 Generating curriculum for: {args.topic}")
    learner = LearnerProfile(
        topic=args.topic,
        current_level=Difficulty(args.level),
        goals=args.goals or [f"Master {args.topic}"],
        available_time_hours=args.hours,
        learning_style=LearningStyle(args.style),
    )
    generator = CurriculumGenerator(client)
    curriculum = generator.generate(index, learner)

    output = args.output
    if output.endswith(".json"):
        with open(output, "w") as f:
            f.write(curriculum.model_dump_json(indent=2))
        print(f"✅ Curriculum saved to {output}")
    elif output.endswith(".md"):
        with open(output, "w") as f:
            f.write(_curriculum_to_markdown(curriculum, index))
        print(f"✅ Curriculum saved to {output}")

    print(f"\n📋 Summary:")
    print(f"   Modules: {len(curriculum.modules)}")
    print(f"   Total Hours: {curriculum.total_estimated_hours}")
    print(f"   Resources Indexed: {index.total_count}")
    print(f"   Index Confidence: {index.confidence:.0%}")
    if curriculum.coverage_gaps:
        print(f"   ⚠ Coverage Gaps: {len(curriculum.coverage_gaps)}")


def _curriculum_to_markdown(curriculum, index) -> str:
    lines = [f"# Curriculum: {curriculum.topic}", ""]
    lines.append(f"**Total Time:** {curriculum.total_estimated_hours} hours")
    lines.append(f"**Resources Available:** {index.total_count}")
    lines.append(f"**Confidence:** {index.confidence:.0%}")
    lines.append("")
    lines.append("## Learning Objectives")
    for obj in curriculum.learning_objectives:
        lines.append(f"- {obj}")
    lines.append("")
    for module in curriculum.modules:
        lines.append(f"## Module {module.order}: {module.title}")
        lines.append(f"*{module.estimated_hours} hours*")
        lines.append("")
        for obj in module.objectives:
            lines.append(f"- {obj}")
        lines.append("")
        for lesson in module.lessons:
            lines.append(f"### Lesson {module.order}.{lesson.order}: {lesson.title}")
            lines.append(f"*{lesson.estimated_minutes} minutes*")
            if lesson.objectives:
                lines.append("**Objectives:**")
                for obj in lesson.objectives:
                    lines.append(f"- {obj}")
            if lesson.resource_ids:
                lines.append("**Resources:**")
                for rid in lesson.resource_ids[:3]:
                    for r in index.resources:
                        if r.id == rid:
                            lines.append(f"- [{r.platform.value}] {r.title}")
                            break
            if lesson.custom_content:
                lines.append("**Custom Content:** Available (PAL-generated)")
            if lesson.exercises:
                lines.append("**Exercises:**")
                for ex in lesson.exercises:
                    lines.append(f"- {ex}")
            lines.append("")
    if curriculum.assessment_milestones:
        lines.append("## Assessment Milestones")
        for m in curriculum.assessment_milestones:
            lines.append(f"- {m}")
        lines.append("")
    if curriculum.recommended_next_topics:
        lines.append("## Recommended Next Topics")
        for t in curriculum.recommended_next_topics:
            lines.append(f"- {t}")
    return "\n".join(lines)


if __name__ == "__main__":
    main()
