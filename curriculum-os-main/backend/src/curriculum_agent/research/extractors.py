class ContentExtractor:
    @staticmethod
    def extract_youtube_metadata(url: str) -> dict:
        return {"platform": "youtube", "requires_api": True}

    @staticmethod
    def extract_article_content(url: str) -> str:
        return ""

    @staticmethod
    def estimate_duration(resource_type: str, content_length: int = 0) -> int:
        durations = {
            "video": 20,
            "article": 10,
            "course": 600,
            "paper": 45,
            "interactive": 30,
            "code": 15,
            "podcast": 30,
            "documentation": 15,
        }
        return durations.get(resource_type, 20)
