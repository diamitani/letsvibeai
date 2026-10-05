class LearnerAdapter:
    @staticmethod
    def from_survey(answers: dict) -> dict:
        return {
            "topic": answers.get("topic", ""),
            "current_level": answers.get("level", "beginner"),
            "goals": [answers.get("goal", "")],
            "available_time_hours": float(answers.get("hours", 20)),
            "learning_style": answers.get("style", "balanced"),
            "preferred_formats": answers.get("formats", []),
            "constraints": answers.get("constraints", []),
            "language": answers.get("language", "en"),
        }

    @staticmethod
    def level_from_experience(experience_years: float) -> str:
        if experience_years < 0.5:
            return "beginner"
        elif experience_years < 2:
            return "intermediate"
        elif experience_years < 5:
            return "advanced"
        return "expert"
