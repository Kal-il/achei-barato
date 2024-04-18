from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from mercado.mercado.schemas import MercadoCreate

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.post("/cadastrar", summary="Cadastrar mercado.")
async def cadastrar_mercado(db: AsyncDBDependency, data: MercadoCreate):
    ...


router.include_router(model_router)
