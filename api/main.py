from fastapi import FastAPI
from api.core.config import settings    
from api.core.routers import api_router

app = FastAPI(
    title=settings.app_name,
    openapi_url=f"{settings.api_str}/openapi.json",
    description="API de integração com o banco de dados e lógica de negócio do Achei Barato",
    docs_url=f"/docs",   
)

app.include_router(api_router)
