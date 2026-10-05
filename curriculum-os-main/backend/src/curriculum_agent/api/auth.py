"""
Auth endpoints — register, login, and current-user lookup.
"""
import hashlib
import os
import uuid
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from src.curriculum_agent.api.dependencies import (
    _get_user_by_email,
    _save_users,
    get_current_user,
)
from src.curriculum_agent.config import config
from src.curriculum_agent.models import UserResponse

router = APIRouter(prefix="/api/v1/auth")


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str = ""


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


def _hash_password(password: str, salt: str) -> str:
    """Hash password with salt using SHA-256."""
    return hashlib.sha256((password + salt).encode()).hexdigest()


def _generate_token(user_id: str) -> str:
    """Generate a JWT access token."""
    payload = {
        "sub": user_id,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, config.JWT_SECRET, algorithm=config.JWT_ALGORITHM)


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """Register a new user account. Returns JWT token on success."""
    email = request.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email address")
    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    existing = _get_user_by_email(email)
    if existing is not None:
        raise HTTPException(status_code=409, detail="Email already registered")

    salt = os.urandom(32).hex()
    password_hash = _hash_password(request.password, salt)
    now = datetime.now(timezone.utc).isoformat()
    user = {
        "id": str(uuid.uuid4()),
        "email": email,
        "password_hash": password_hash,
        "salt": salt,
        "name": request.name.strip(),
        "plan": "free",
        "created_at": now,
    }

    _save_users([user])

    token = _generate_token(user["id"])
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            plan=user["plan"],
            created_at=user["created_at"],
        ),
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """Log in with email and password. Returns JWT token on success."""
    email = request.email.strip().lower()
    if not email or not request.password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    user = _get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    expected_hash = _hash_password(request.password, user["salt"])
    if expected_hash != user["password_hash"]:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = _generate_token(user["id"])
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            plan=user["plan"],
            created_at=user["created_at"],
        ),
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Return the currently authenticated user."""
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        name=current_user["name"],
        plan=current_user["plan"],
        created_at=current_user["created_at"],
    )
