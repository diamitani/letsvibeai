from src.curriculum_agent.npao.orchestrator import NPAOScorer, Phase


def score_curriculum_task(topic: str, resource_count: int, time_budget: float) -> float:
    phase = Phase.DEVELOPMENT
    dep_impact = 3 if resource_count < 5 else 1
    biz_impact = 7 if time_budget > 40 else 5
    eff = 10 if time_budget < 10 else 5
    return NPAOScorer.score(phase, dep_impact, biz_impact, eff)


def score_research_task(topic: str, breadth: str) -> float:
    phase = Phase.PRED
    dep_impact = 5 if breadth == "broad" else 2
    return NPAOScorer.score(phase, dep_impact, 4, 7)
