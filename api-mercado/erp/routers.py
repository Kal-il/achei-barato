from fastapi import APIRouter
from erp.mercado.routers import router as mercado_router

router = APIRouter()
router.include_router(mercado_router)