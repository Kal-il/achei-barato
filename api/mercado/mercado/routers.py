from typing import Annotated

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado.schemas import MercadoCreate
from mercado.mercado.use_cases import mercado_usecases
from usuario.usuario.models import Usuario

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.post("/cadastrar", summary="Cadastrar mercado.")
async def cadastrar_mercado(db: AsyncDBDependency, data: MercadoCreate, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    if usuario:
        data.usuario = usuario
    return await mercado_usecases.cadastrar_mercado(db=db, data=data)


router.include_router(model_router)
