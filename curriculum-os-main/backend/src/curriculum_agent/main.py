from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.curriculum_agent.api.routes import router
from src.curriculum_agent.api.auth import router as auth_router
from src.curriculum_agent.api.curriculum_store import router as curricula_router
from src.curriculum_agent.config import config

app = FastAPI(
    title="CurriculumOS API",
    description="AI-Powered Curriculum Architect — Research, Index, and Generate personalized learning paths",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.API_CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(auth_router)
app.include_router(curricula_router)


@app.on_event("startup")
async def startup():
    pass


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)
