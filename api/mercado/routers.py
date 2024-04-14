from fastapi import APIRouter
from api.usuario.usuario.routers import router as usuario_router
from api.mercado.mercado.routers import router as mercado_router

router = APIRouter()
router.include_router(usuario_router)
router.include_router(mercado_router)
