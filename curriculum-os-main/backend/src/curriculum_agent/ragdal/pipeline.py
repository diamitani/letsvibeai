"""
RAG DAL — Dynamic Acquisition Layer
Multi-pass, tiered web retrieval with autonomous coverage assessment.
"""

import json
from enum import Enum
from dataclasses import dataclass, field
from typing import Optional
from src.curriculum_agent.config import config


class SourceTier(int, Enum):
    AUTHORITATIVE = 1
    EDITORIAL = 2
    COMMUNITY = 3


@dataclass
class SearchResult:
    query: str
    tier: SourceTier
    content: str
    url: str
    confidence: float
    topics: list[str] = field(default_factory=list)


@dataclass
class CoverageReport:
    overall_confidence: float
    passes_run: int
    sources_consulted: int
    gaps: list[str] = field(default_factory=list)
    uncertain: list[str] = field(default_factory=list)
    findings: dict = field(default_factory=dict)


class RAGDALPipeline:
    def __init__(self, deepseek_client=None):
        self.client = deepseek_client
        self.confidence_threshold = config.RAGDAL_CONFIDENCE_THRESHOLD
        self.max_passes = config.RAGDAL_MAX_PASSES

    def research(self, topic: str, context: Optional[dict] = None) -> CoverageReport:
        all_sources = []
        for pass_num in range(1, self.max_passes + 1):
            if pass_num == 1:
                sources = self._broad_sweep(topic)
            else:
                gaps = self._identify_gaps(all_sources, topic)
                if not gaps:
                    break
                sources = self._gap_fill(gaps, topic)
            all_sources.extend(sources)
            report = self._assess_coverage(all_sources, topic)
            if report.overall_confidence >= self.confidence_threshold:
                break
        return report

    def _broad_sweep(self, topic: str) -> list[SearchResult]:
        queries = [
            f"{topic} fundamentals concepts overview",
            f"{topic} advanced topics research",
            f"{topic} practical applications",
            f"{topic} learning path curriculum",
            f"{topic} tools libraries frameworks",
        ]
        results = []
        for q in queries:
            tier = SourceTier.AUTHORITATIVE if "research" in q else SourceTier.EDITORIAL
            results.append(self._simulated_search(q, tier))
        return results

    def _gap_fill(self, gaps: list[str], topic: str) -> list[SearchResult]:
        results = []
        for gap in gaps[:3]:
            q = f"{topic} {gap} tutorial guide"
            results.append(self._simulated_search(q, SourceTier.EDITORIAL))
        return results

    def _simulated_search(self, query: str, tier: SourceTier) -> SearchResult:
        return SearchResult(
            query=query,
            tier=tier,
            content=f"Simulated content for: {query}",
            url=f"https://example.com/search?q={query.replace(' ', '+')}",
            confidence=0.8 if tier == SourceTier.AUTHORITATIVE else 0.6,
            topics=query.split(),
        )

    def _identify_gaps(self, sources: list[SearchResult], topic: str) -> list[str]:
        covered = set()
        for s in sources:
            covered.update(t.lower() for t in s.topics)
        expected = {
            "introduction",
            "fundamentals",
            "advanced",
            "applications",
            "tools",
            "best_practices",
        }
        return [t for t in expected if t not in covered]

    def _assess_coverage(
        self, sources: list[SearchResult], topic: str
    ) -> CoverageReport:
        if not sources:
            return CoverageReport(
                overall_confidence=0.0, passes_run=0, sources_consulted=0
            )
        tier1 = sum(1 for s in sources if s.tier == SourceTier.AUTHORITATIVE)
        tier2 = sum(1 for s in sources if s.tier == SourceTier.EDITORIAL)
        tier3 = sum(1 for s in sources if s.tier == SourceTier.COMMUNITY)
        total = len(sources)
        score = (tier1 * 1.0 + tier2 * 0.75 + tier3 * 0.4) / total if total > 0 else 0
        return CoverageReport(
            overall_confidence=round(min(1.0, score), 2),
            passes_run=1,
            sources_consulted=total,
            gaps=self._identify_gaps(sources, topic),
            findings={"tier_1": tier1, "tier_2": tier2, "tier_3": tier3},
        )
