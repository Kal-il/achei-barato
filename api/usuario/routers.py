from fastapi import APIRouter
from api.usuario.usuario.routers import router as usuario_router
from api.usuario.consumidor.routers import router as consumidor_router

router = APIRouter()
router.include_router(usuario_router)
router.include_router(consumidor_router)
