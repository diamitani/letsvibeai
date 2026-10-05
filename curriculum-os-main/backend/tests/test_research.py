import pytest
from src.curriculum_agent.research.engine import ResearchEngine
from src.curriculum_agent.models import SourceTier


class TestResearchEngine:
    def setup_method(self):
        self.engine = ResearchEngine()

    def test_research_basic(self):
        resources = self.engine.research(
            "Python programming", depth="beginner", max_results=10
        )
        assert len(resources) > 0
        assert len(resources) <= 10

    def test_research_tiers(self):
        resources = self.engine.research("machine learning", max_results=20)
        tiers = set(r.source_tier for r in resources)
        assert len(tiers) > 0

    def test_deduplication(self):
        resources = self.engine.research("data science", max_results=30)
        titles = [r.title.lower() for r in resources]
        assert len(titles) == len(set(titles))

    def test_relevance_scoring(self):
        resources = self.engine.research("deep learning", depth="advanced")
        if len(resources) >= 2:
            assert resources[0].credibility_score >= resources[-1].credibility_score

    def test_different_depths(self):
        beginner = self.engine.research("Python", depth="beginner", max_results=5)
        advanced = self.engine.research("Python", depth="advanced", max_results=5)
        assert len(beginner) > 0
        assert len(advanced) > 0
