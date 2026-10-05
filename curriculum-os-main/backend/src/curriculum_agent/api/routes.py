from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from src.curriculum_agent.models import (
    LearnerProfile,
    Difficulty,
    LearningStyle,
    ResourceType,
)
from src.curriculum_agent.pal.compiler import PALCompiler
from src.curriculum_agent.research.engine import ResearchEngine
from src.curriculum_agent.index.master_index import MasterIndexBuilder
from src.curriculum_agent.curriculum.generator import CurriculumGenerator
from src.curriculum_agent.deepseek_client import DeepSeekClient

router = APIRouter(prefix="/api/v1")


class ResearchRequest(BaseModel):
    topic: str
    depth: str = "intermediate"
    platforms: Optional[list[str]] = None
    max_results: int = 50


class IndexRequest(BaseModel):
    topic: str
    resources: list[dict] = []
    format: str = "json"


class GenerateRequest(BaseModel):
    topic: str
    learner_level: str = "intermediate"
    learner_goals: list[str] = []
    available_time_hours: float = 20.0
    learning_style: str = "balanced"
    preferred_formats: Optional[list[str]] = None
    index_id: Optional[str] = None


@router.post("/research")
async def research_endpoint(request: ResearchRequest):
    client = DeepSeekClient()
    engine = ResearchEngine(client)
    resources = engine.research(
        request.topic, request.depth, request.platforms, request.max_results
    )
    return {
        "topic": request.topic,
        "total_found": len(resources),
        "resources": [r.model_dump() for r in resources],
    }


@router.post("/index")
async def index_endpoint(request: IndexRequest):
    from src.curriculum_agent.models import Resource

    client = DeepSeekClient()
    builder = MasterIndexBuilder(client)
    resources = [Resource(**r) for r in request.resources]
    index = builder.build(request.topic, resources)
    if request.format == "markdown":
        return {"index": builder.export_markdown(index)}
    elif request.format == "csv":
        return {"index": builder.export_csv(index)}
    return {"index": index.model_dump()}


@router.post("/generate")
async def generate_endpoint(request: GenerateRequest):
    client = DeepSeekClient()
    engine = ResearchEngine(client)
    builder = MasterIndexBuilder(client)
    generator = CurriculumGenerator(client)

    resources = engine.research(request.topic, request.learner_level)
    index = builder.build(request.topic, resources)

    format_map = {}
    if request.preferred_formats:
        format_map = {
            f: ResourceType(f)
            for f in request.preferred_formats
            if f in [rt.value for rt in ResourceType]
        }

    learner = LearnerProfile(
        topic=request.topic,
        current_level=Difficulty(request.learner_level),
        goals=request.learner_goals,
        available_time_hours=request.available_time_hours,
        learning_style=LearningStyle(request.learning_style),
        preferred_formats=list(format_map.values()),
    )

    curriculum = generator.generate(index, learner)
    return {
        "curriculum": curriculum.model_dump(),
        "index": {
            "id": index.id,
            "topic": index.topic,
            "resource_count": index.total_count,
            "confidence": index.confidence,
        },
    }


@router.get("/health")
async def health_check():
    client = DeepSeekClient()
    deepseek_ok = client.verify()
    return {
        "status": "healthy" if deepseek_ok else "degraded",
        "deepseek_api": "connected" if deepseek_ok else "disconnected",
        "version": "0.1.0",
    }
