from fastapi import APIRouter
from .config import settings

api_router = APIRouter(prefix=settings.api_str)
