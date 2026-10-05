from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
import uuid


class SourceTier(int, Enum):
    TIER_1 = 1
    TIER_2 = 2
    TIER_3 = 3


class Platform(str, Enum):
    YOUTUBE = "youtube"
    COURSERA = "coursera"
    UDEMY = "udemy"
    EDX = "edx"
    BLOG = "blog"
    NEWSLETTER = "newsletter"
    ARXIV = "arxiv"
    DOCS = "documentation"
    PODCAST = "podcast"
    GITHUB = "github"
    OTHER = "other"


class ResourceType(str, Enum):
    VIDEO = "video"
    ARTICLE = "article"
    COURSE = "course"
    PAPER = "paper"
    INTERACTIVE = "interactive"
    CODE = "code"
    PODCAST_EPISODE = "podcast"
    DOCUMENTATION = "documentation"


class Difficulty(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class LearningStyle(str, Enum):
    PROJECT_BASED = "project-based"
    THEORY_FIRST = "theory-first"
    BALANCED = "balanced"


class Resource(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    url: str
    platform: Platform
    resource_type: ResourceType
    source_tier: SourceTier
    credibility_score: float = Field(ge=0.0, le=1.0)
    author: Optional[str] = None
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    language: str = "en"
    difficulty: Optional[Difficulty] = None
    topics: list[str] = []
    prerequisites: list[str] = []
    rating: Optional[float] = Field(None, ge=0.0, le=5.0)
    published_date: Optional[str] = None
    retrieved_date: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class LearnerProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    topic: str
    current_level: Difficulty = Difficulty.BEGINNER
    goals: list[str] = []
    available_time_hours: float = 20.0
    learning_style: LearningStyle = LearningStyle.BALANCED
    preferred_formats: list[ResourceType] = []
    constraints: list[str] = []
    language: str = "en"


class Lesson(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    order: int
    objectives: list[str] = []
    resource_ids: list[str] = []
    custom_content: Optional[str] = None
    exercises: list[str] = []
    estimated_minutes: int = 60


class Module(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    order: int
    estimated_hours: float
    objectives: list[str] = []
    lessons: list[Lesson] = []


class Curriculum(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    learner_id: str
    topic: str
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    total_estimated_hours: float
    learning_objectives: list[str] = []
    modules: list[Module] = []
    assessment_milestones: list[str] = []
    coverage_gaps: list[str] = []
    recommended_next_topics: list[str] = []


class MasterIndex(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    topic: str
    resources: list[Resource] = []
    taxonomy: dict = {}
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    total_count: int = 0
    by_tier: dict = {}
    by_platform: dict = {}
    confidence: float = 0.0


class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    salt: str
    name: str = ""
    plan: str = "free"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    plan: str
    created_at: str


class PALIntent(BaseModel):
    primary_intent: str
    domain: str
    subject: str
    constraints: list[str] = []
    desired_output: str
    ambiguity_score: float = Field(ge=0.0, le=1.0)
    enhanced_instruction: Optional[str] = None
