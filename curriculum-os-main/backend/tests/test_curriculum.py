import pytest
from src.curriculum_agent.curriculum.generator import CurriculumGenerator
from src.curriculum_agent.models import (
    MasterIndex,
    LearnerProfile,
    Resource,
    Platform,
    ResourceType,
    SourceTier,
    Difficulty,
    LearningStyle,
)


class TestCurriculumGenerator:
    def setup_method(self):
        self.generator = CurriculumGenerator()
        self.resources = [
            Resource(
                title="Intro to RL",
                url="https://youtube.com/rl",
                platform=Platform.YOUTUBE,
                resource_type=ResourceType.VIDEO,
                source_tier=SourceTier.TIER_3,
                credibility_score=0.6,
                difficulty=Difficulty.BEGINNER,
                topics=["rl", "mdp"],
            ),
            Resource(
                title="RL Course",
                url="https://coursera.com/rl",
                platform=Platform.COURSERA,
                resource_type=ResourceType.COURSE,
                source_tier=SourceTier.TIER_2,
                credibility_score=0.8,
                difficulty=Difficulty.INTERMEDIATE,
                topics=["rl", "policy gradients", "q-learning"],
            ),
            Resource(
                title="RL Theory",
                url="https://arxiv.org/rl",
                platform=Platform.ARXIV,
                resource_type=ResourceType.PAPER,
                source_tier=SourceTier.TIER_1,
                credibility_score=0.95,
                difficulty=Difficulty.ADVANCED,
                topics=["rl", "bellman", "mdp"],
            ),
        ]
        self.index = MasterIndex(
            topic="reinforcement learning",
            resources=self.resources,
            total_count=3,
            by_tier={"tier_1": 1, "tier_2": 1, "tier_3": 1},
            by_platform={"youtube": 1, "coursera": 1, "arxiv": 1},
            confidence=0.85,
        )

    def test_generate_curriculum(self):
        learner = LearnerProfile(
            topic="reinforcement learning",
            current_level=Difficulty.BEGINNER,
            goals=["Build a trading bot"],
            available_time_hours=40,
            learning_style=LearningStyle.PROJECT_BASED,
        )
        curriculum = self.generator.generate(self.index, learner)
        assert curriculum.topic == "reinforcement learning"
        assert len(curriculum.modules) > 0

    def test_learner_profile_adaptation(self):
        beginner = LearnerProfile(
            topic="RL", current_level=Difficulty.BEGINNER, available_time_hours=20
        )
        advanced = LearnerProfile(
            topic="RL", current_level=Difficulty.ADVANCED, available_time_hours=40
        )
        beginner_curriculum = self.generator.generate(self.index, beginner)
        advanced_curriculum = self.generator.generate(self.index, advanced)
        assert len(beginner_curriculum.modules) > 0

    def test_learning_objectives(self):
        learner = LearnerProfile(topic="RL", goals=["Master PPO", "Build an agent"])
        curriculum = self.generator.generate(self.index, learner)
        assert len(curriculum.learning_objectives) > 0

    def test_assessment_milestones(self):
        learner = LearnerProfile(topic="RL")
        curriculum = self.generator.generate(self.index, learner)
        assert len(curriculum.assessment_milestones) > 0

    def test_gap_detection(self):
        learner = LearnerProfile(topic="quantum computing")
        empty_index = MasterIndex(
            topic="quantum computing",
            resources=[],
            total_count=0,
            by_tier={},
            by_platform={},
            confidence=0.0,
        )
        curriculum = self.generator.generate(empty_index, learner)
        assert curriculum.coverage_gaps is not None
