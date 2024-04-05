from fastapi import APIRouter
from api.usuario.usuario.routers import router as usuario_router

router = APIRouter()
router.include_router(usuario_router)
