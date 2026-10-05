"""
Curriculum persistence — save, list, retrieve, and delete curricula for authenticated users.
"""

import json
import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from src.curriculum_agent.api.dependencies import get_current_user
from src.curriculum_agent.config import config

router = APIRouter(prefix="/api/v1/curricula")


class SaveRequest(BaseModel):
    curriculum: dict


class SavedCurriculumResponse(BaseModel):
    id: str
    user_id: str
    topic: str
    saved_at: str
    data: dict


def _load_curricula() -> list[dict]:
    """Load curricula from JSON file, returning empty list on any failure."""
    path = config.DATA_DIR / "curricula.json"
    try:
        if path.exists():
            return json.loads(path.read_text())
    except (json.JSONDecodeError, OSError):
        pass
    return []


def _save_curricula(data: list[dict]) -> None:
    """Save curricula to JSON file atomically."""
    path = config.DATA_DIR / "curricula.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(".tmp")
    tmp_path.write_text(json.dumps(data, indent=2))
    os.replace(tmp_path, path)


@router.post("/save", response_model=SavedCurriculumResponse)
async def save_curriculum(
    request: SaveRequest, current_user: dict = Depends(get_current_user)
):
    """Save a curriculum for the authenticated user."""
    topic = request.curriculum.get("topic", "Untitled")
    now = datetime.now(timezone.utc).isoformat()

    curricula = _load_curricula()
    entry = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "topic": topic,
        "saved_at": now,
        "data": request.curriculum,
    }
    curricula.append(entry)
    _save_curricula(curricula)

    return SavedCurriculumResponse(
        id=entry["id"],
        user_id=entry["user_id"],
        topic=entry["topic"],
        saved_at=entry["saved_at"],
        data=entry["data"],
    )


@router.get("", response_model=list[dict])
async def list_curricula(current_user: dict = Depends(get_current_user)):
    """List all saved curricula for the authenticated user."""
    curricula = _load_curricula()
    user_curricula = [c for c in curricula if c["user_id"] == current_user["id"]]
    # Return lightweight list — exclude full data payload
    return [
        {
            "id": c["id"],
            "topic": c["topic"],
            "saved_at": c["saved_at"],
        }
        for c in user_curricula
    ]


@router.get("/{curriculum_id}", response_model=SavedCurriculumResponse)
async def get_curriculum(
    curriculum_id: str, current_user: dict = Depends(get_current_user)
):
    """Retrieve a specific saved curriculum by ID."""
    curricula = _load_curricula()
    for c in curricula:
        if c["id"] == curriculum_id and c["user_id"] == current_user["id"]:
            return SavedCurriculumResponse(
                id=c["id"],
                user_id=c["user_id"],
                topic=c["topic"],
                saved_at=c["saved_at"],
                data=c["data"],
            )
    raise HTTPException(status_code=404, detail="Curriculum not found")


@router.delete("/{curriculum_id}")
async def delete_curriculum(
    curriculum_id: str, current_user: dict = Depends(get_current_user)
):
    """Delete a saved curriculum by ID."""
    curricula = _load_curricula()
    found = False
    new_list = []
    for c in curricula:
        if c["id"] == curriculum_id and c["user_id"] == current_user["id"]:
            found = True
        else:
            new_list.append(c)

    if not found:
        raise HTTPException(status_code=404, detail="Curriculum not found")

    _save_curricula(new_list)
    return {"ok": True, "deleted": curriculum_id}
