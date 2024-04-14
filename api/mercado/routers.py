from fastapi import APIRouter
from usuario.usuario.routers import router as usuario_router
from mercado.mercado.routers import router as mercado_router

router = APIRouter()
router.include_router(usuario_router)
router.include_router(mercado_router)
