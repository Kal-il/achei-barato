from fastapi import APIRouter
from usuario.usuario.routers import router as usuario_router
from usuario.consumidor.routers import router as consumidor_router
from usuario.auth.routers import router as auth_router

router = APIRouter()
router.include_router(usuario_router)
router.include_router(auth_router)
router.include_router(consumidor_router)

