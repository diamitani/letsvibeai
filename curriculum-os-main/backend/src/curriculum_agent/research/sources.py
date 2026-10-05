from src.curriculum_agent.models import Platform, SourceTier

PLATFORM_TIER_MAP = {
    Platform.ARXIV: SourceTier.TIER_1,
    Platform.DOCS: SourceTier.TIER_1,
    Platform.COURSERA: SourceTier.TIER_2,
    Platform.EDX: SourceTier.TIER_2,
    Platform.UDEMY: SourceTier.TIER_2,
    Platform.YOUTUBE: SourceTier.TIER_3,
    Platform.BLOG: SourceTier.TIER_3,
    Platform.NEWSLETTER: SourceTier.TIER_3,
    Platform.PODCAST: SourceTier.TIER_3,
    Platform.GITHUB: SourceTier.TIER_3,
    Platform.OTHER: SourceTier.TIER_3,
}

PLATFORM_CREDIBILITY = {
    Platform.ARXIV: 0.95,
    Platform.DOCS: 0.90,
    Platform.COURSERA: 0.80,
    Platform.EDX: 0.85,
    Platform.UDEMY: 0.70,
    Platform.YOUTUBE: 0.50,
    Platform.BLOG: 0.45,
    Platform.NEWSLETTER: 0.55,
    Platform.PODCAST: 0.50,
    Platform.GITHUB: 0.60,
    Platform.OTHER: 0.40,
}

PLATFORM_SEARCH_PRIORITY = {
    SourceTier.TIER_1: [Platform.ARXIV, Platform.DOCS],
    SourceTier.TIER_2: [Platform.COURSERA, Platform.EDX, Platform.UDEMY],
    SourceTier.TIER_3: [
        Platform.YOUTUBE,
        Platform.BLOG,
        Platform.NEWSLETTER,
        Platform.PODCAST,
        Platform.GITHUB,
    ],
}
