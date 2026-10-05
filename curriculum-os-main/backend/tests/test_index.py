import pytest
from src.curriculum_agent.models import (
    MasterIndex,
    Resource,
    Platform,
    ResourceType,
    SourceTier,
    Difficulty,
)
from src.curriculum_agent.index.master_index import MasterIndexBuilder


class TestMasterIndexBuilder:
    def setup_method(self):
        self.builder = MasterIndexBuilder()
        self.resources = [
            Resource(
                title="Intro to Python",
                url="https://example.com/python",
                platform=Platform.YOUTUBE,
                resource_type=ResourceType.VIDEO,
                source_tier=SourceTier.TIER_3,
                credibility_score=0.6,
                difficulty=Difficulty.BEGINNER,
                topics=["python", "programming"],
            ),
            Resource(
                title="Advanced Python",
                url="https://example.com/advanced-python",
                platform=Platform.COURSERA,
                resource_type=ResourceType.COURSE,
                source_tier=SourceTier.TIER_2,
                credibility_score=0.8,
                difficulty=Difficulty.ADVANCED,
                topics=["python", "oop", "design patterns"],
            ),
            Resource(
                title="Python for Data Science",
                url="https://arxiv.org/python-ds",
                platform=Platform.ARXIV,
                resource_type=ResourceType.PAPER,
                source_tier=SourceTier.TIER_1,
                credibility_score=0.95,
                difficulty=Difficulty.INTERMEDIATE,
                topics=["python", "data science", "numpy"],
            ),
        ]

    def test_build_index(self):
        index = self.builder.build("Python", self.resources)
        assert index.total_count == 3
        assert index.topic == "Python"

    def test_tier_counting(self):
        index = self.builder.build("Python", self.resources)
        assert index.by_tier["tier_1"] == 1
        assert index.by_tier["tier_2"] == 1
        assert index.by_tier["tier_3"] == 1

    def test_platform_counting(self):
        index = self.builder.build("Python", self.resources)
        assert index.by_platform["youtube"] == 1
        assert index.by_platform["coursera"] == 1

    def test_confidence_calculation(self):
        index = self.builder.build("Python", self.resources)
        assert index.confidence > 0.5

    def test_export_markdown(self):
        index = self.builder.build("Python", self.resources)
        md = self.builder.export_markdown(index)
        assert "Python" in md
        assert "Total Resources" in md

    def test_export_csv(self):
        index = self.builder.build("Python", self.resources)
        csv = self.builder.export_csv(index)
        assert "title" in csv
        assert "Intro to Python" in csv
