import os
from pathlib import Path
from typing import Optional


class Config:
    BASE_DIR = Path(__file__).parent.parent.parent

    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")
    DEEPSEEK_MODEL: str = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
    DEEPSEEK_BASE_URL: str = os.getenv(
        "DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1"
    )

    RAGDAL_CONFIDENCE_THRESHOLD: float = float(
        os.getenv("RAGDAL_CONFIDENCE_THRESHOLD", "0.8")
    )
    RAGDAL_MAX_PASSES: int = int(os.getenv("RAGDAL_MAX_PASSES", "3"))
    RAGDAL_CACHE_TTL_HOURS: int = int(os.getenv("RAGDAL_CACHE_TTL_HOURS", "72"))

    KNOWLEDGE_BASE_PATH: Path = Path(
        os.getenv("KNOWLEDGE_BASE_PATH", str(BASE_DIR / "rostr-hub" / "knowledge-base"))
    )

    NPAO_DEFAULT_PATTERN: str = os.getenv("NPAO_DEFAULT_PATTERN", "sequential")
    NPAO_MAX_PARALLEL_TASKS: int = int(os.getenv("NPAO_MAX_PARALLEL_TASKS", "5"))
    NPAO_TASK_TIMEOUT_MINUTES: int = int(os.getenv("NPAO_TASK_TIMEOUT_MINUTES", "30"))

    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    API_CORS_ORIGINS: str = os.getenv("API_CORS_ORIGINS", "*")

    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")

    JWT_SECRET: str = os.getenv("JWT_SECRET", "curriculum-os-dev-secret-change-in-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")

    # Local fallback data dir (used when DynamoDB is not configured)
    DATA_DIR: Path = Path(os.getenv("DATA_DIR", str(BASE_DIR / "data")))

    # AWS / DynamoDB settings
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    DYNAMODB_USERS_TABLE: str = os.getenv("DYNAMODB_USERS_TABLE", "curriculum_os_users")
    # Set USE_DYNAMODB=true in production; falls back to JSON file locally
    USE_DYNAMODB: bool = os.getenv("USE_DYNAMODB", "false").lower() == "true"

    @classmethod
    def verify(cls) -> list[str]:
        checks = []
        if cls.DEEPSEEK_API_KEY:
            checks.append("✓ DeepSeek API key configured")
        else:
            checks.append("✗ DeepSeek API key NOT configured — set DEEPSEEK_API_KEY")
        checks.append(
            f"✓ RAG DAL confidence threshold: {cls.RAGDAL_CONFIDENCE_THRESHOLD}"
        )
        if cls.USE_DYNAMODB:
            checks.append(f"✓ DynamoDB enabled — table: {cls.DYNAMODB_USERS_TABLE} in {cls.AWS_REGION}")
        else:
            checks.append("ℹ DynamoDB disabled — using local JSON file storage")
        return checks


config = Config()
