#!/usr/bin/env python3
"""Entry point to run the CurriculumOS FastAPI server."""
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from src.curriculum_agent.main import app
import uvicorn
from src.curriculum_agent.config import config

if __name__ == "__main__":
    print(f"🚀 CurriculumOS API starting on http://{config.API_HOST}:{config.API_PORT}")
    print(f"   Health: http://localhost:{config.API_PORT}/api/v1/health")
    uvicorn.run(app, host=config.API_HOST, port=config.API_PORT)
