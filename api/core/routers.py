from fastapi import APIRouter
from api.usuario.routers import router as usuario_router
from .config import settings

api_router = APIRouter(prefix=settings.api_str)
api_router.include_router(usuario_router, prefix="/usuario")
