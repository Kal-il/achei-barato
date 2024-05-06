from fastapi import APIRouter
from usuario.routers import router as usuario_router
from mercado.routers import router as mercado_router
from .config import settings

api_router = APIRouter(prefix=settings.api_str)
api_router.include_router(usuario_router, prefix="/usuario")
api_router.include_router(mercado_router, prefix="/mercado")
