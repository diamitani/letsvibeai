from pydantic import BaseModel
from typing import Optional
from src.curriculum_agent.models import (
    Resource,
    LearnerProfile,
    Curriculum,
    MasterIndex,
)


class ResearchResponse(BaseModel):
    topic: str
    total_found: int
    resources: list[Resource]


class IndexResponse(BaseModel):
    index: MasterIndex


class GenerateResponse(BaseModel):
    curriculum: Curriculum
    index_summary: dict


class HealthResponse(BaseModel):
    status: str
    deepseek_api: str
    version: str
