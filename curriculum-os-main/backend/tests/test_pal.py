import pytest
from src.curriculum_agent.pal.compiler import PALCompiler
from src.curriculum_agent.models import LearnerProfile, Difficulty, LearningStyle


class TestPALCompiler:
    def setup_method(self):
        self.compiler = PALCompiler()

    def test_extract_intent_basic(self):
        intent = self.compiler.extract_intent("I want to learn Python")
        assert intent is not None
        assert "Python" in intent.subject
        assert intent.ambiguity_score >= 0.0

    def test_extract_intent_detailed(self):
        intent = self.compiler.extract_intent(
            "I want to learn reinforcement learning, I'm a software engineer with Python experience"
        )
        assert intent is not None
        assert intent.ambiguity_score <= 0.7

    def test_compile_with_profile(self):
        learner = LearnerProfile(
            topic="machine learning",
            current_level=Difficulty.INTERMEDIATE,
            goals=["build a classifier"],
            available_time_hours=30,
            learning_style=LearningStyle.PROJECT_BASED,
        )
        result = self.compiler.compile("I want to learn ML", learner)
        assert "intent" in result
        assert "context" in result
        assert "enhanced_instruction" in result
        assert "runtime" in result

    def test_context_injection(self):
        learner = LearnerProfile(topic="Python", available_time_hours=10)
        context = self.compiler.inject_context(None, learner)
        assert context["learner"]["time_budget_hours"] == 10

    def test_generate_custom_content(self):
        content = self.compiler.generate_custom_content(
            "Markov Decision Processes",
            "No resources found on this specific topic",
            "intermediate",
        )
        assert content is not None
        assert len(content) > 0
