from src.curriculum_agent.models import MasterIndex


class IndexSerializer:
    @staticmethod
    def to_api_response(index: MasterIndex) -> dict:
        return {
            "id": index.id,
            "topic": index.topic,
            "total_resources": index.total_count,
            "by_tier": index.by_tier,
            "by_platform": index.by_platform,
            "confidence": index.confidence,
            "created_at": index.created_at,
            "resources": [
                {
                    "id": r.id,
                    "title": r.title,
                    "url": r.url,
                    "platform": r.platform.value,
                    "type": r.resource_type.value,
                    "tier": r.source_tier,
                    "difficulty": r.difficulty.value if r.difficulty else None,
                    "topics": r.topics,
                }
                for r in index.resources
            ],
        }
