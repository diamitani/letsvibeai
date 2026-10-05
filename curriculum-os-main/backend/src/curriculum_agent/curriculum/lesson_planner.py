class LessonPlanner:
    @staticmethod
    def estimate_module_hours(
        total_hours: float, module_count: int, weights: list[float]
    ) -> list[float]:
        if len(weights) != module_count:
            weights = [1.0 / module_count] * module_count
        total_weight = sum(weights)
        return [total_hours * (w / total_weight) for w in weights]

    @staticmethod
    def validate_sequence(modules: list) -> list[str]:
        issues = []
        for i, module in enumerate(modules):
            for lesson in getattr(module, "lessons", []):
                for prereq in getattr(lesson, "prerequisites", []):
                    found = False
                    for m in modules[:i]:
                        for l in getattr(m, "lessons", []):
                            if prereq.lower() in l.title.lower():
                                found = True
                                break
                    if not found:
                        issues.append(
                            f"Prerequisite '{prereq}' not found before '{lesson.title}'"
                        )
        return issues
