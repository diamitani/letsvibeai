"""
NPAO — Navigate, Prioritize, Allocate, Orchestrate
Phase-aware task routing and priority scoring for curriculum generation.
"""

from enum import Enum
from dataclasses import dataclass
from typing import Optional


class Phase(str, Enum):
    PRED = "pred"
    DESIGN = "design"
    DEVELOPMENT = "development"
    DEPLOYMENT = "deployment"
    DEBUGGING = "debugging"


@dataclass
class NPATask:
    id: str
    name: str
    phase: Phase
    priority: float = 0.0
    dependencies: list[str] = None


class NPAOScorer:
    WEIGHTS = {
        "phase_urgency": 0.35,
        "dependency_impact": 0.30,
        "business_impact": 0.25,
        "resource_efficiency": 0.10,
    }

    PHASE_URGENCY = {
        Phase.DEBUGGING: 10,
        Phase.DEPLOYMENT: 8,
        Phase.DEVELOPMENT: 6,
        Phase.DESIGN: 4,
        Phase.PRED: 2,
    }

    @classmethod
    def score(
        cls,
        phase: Phase,
        dependency_count: int,
        business_impact: int = 5,
        efficiency: int = 7,
    ) -> float:
        urgency = cls.PHASE_URGENCY.get(phase, 5)
        dep_score = min(10, dependency_count * 3)
        score = (
            urgency * cls.WEIGHTS["phase_urgency"]
            + dep_score * cls.WEIGHTS["dependency_impact"]
            + business_impact * cls.WEIGHTS["business_impact"]
            + efficiency * cls.WEIGHTS["resource_efficiency"]
        )
        return round(score, 2)


class NPAOOrchestrator:
    def __init__(self):
        self.tasks: list[NPATask] = []

    def navigate(self, task: NPATask) -> Phase:
        return task.phase

    def prioritize(self, task: NPATask) -> float:
        dep_count = 0
        if task.dependencies:
            dep_count = len([t for t in self.tasks if t.id in task.dependencies])
        return NPAOScorer.score(task.phase, dep_count)

    def orchestrate(self, tasks: list[NPATask]) -> list[NPATask]:
        for task in tasks:
            task.priority = self.prioritize(task)
        return sorted(tasks, key=lambda t: t.priority, reverse=True)
