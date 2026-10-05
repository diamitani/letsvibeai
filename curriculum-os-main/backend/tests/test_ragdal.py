import pytest
from src.curriculum_agent.ragdal.pipeline import RAGDALPipeline, SourceTier
from src.curriculum_agent.ragdal.knowledge_base import KnowledgeBase


class TestRAGDALPipeline:
    def setup_method(self):
        self.pipeline = RAGDALPipeline()

    def test_research_basic(self):
        report = self.pipeline.research("machine learning")
        assert report.overall_confidence > 0.0
        assert report.sources_consulted > 0

    def test_gap_detection(self):
        report = self.pipeline.research("quantum computing")
        assert hasattr(report, "gaps")

    def test_coverage_assessment(self):
        report = self.pipeline.research("deep learning")
        assert "tier_1" in report.findings
        assert "tier_2" in report.findings


class TestKnowledgeBase:
    def setup_method(self):
        import tempfile

        self.tmpdir = tempfile.mkdtemp()
        from pathlib import Path

        self.kb = KnowledgeBase(base_path=Path(self.tmpdir))

    def test_store_and_retrieve(self):
        path = self.kb.store("test", {"topic": "python", "resources": 5})
        assert path is not None
        entries = self.kb.retrieve("test")
        assert len(entries) == 1

    def test_query(self):
        self.kb.store("test", {"topic": "python", "resources": 5})
        self.kb.store("test", {"topic": "rust", "resources": 3})
        results = self.kb.query("test", "python")
        assert len(results) == 1
        assert results[0]["topic"] == "python"

    def test_clear(self):
        self.kb.store("test", {"topic": "python"})
        self.kb.clear("test")
        assert len(self.kb.retrieve("test")) == 0
