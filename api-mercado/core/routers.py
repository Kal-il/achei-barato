from fastapi import APIRouter
from .config import settings
from erp.routers import router as erp_router

api_router = APIRouter(prefix=settings.api_str)

api_router.include_router(erp_router, prefix="/erp")
