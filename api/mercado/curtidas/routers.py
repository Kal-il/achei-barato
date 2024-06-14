from datetime import datetime
from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, BackgroundTasks

from mercado.mercado.models import Mercado
from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado import schemas
from usuario.usuario.models import Usuario
from .use_cases import use_cases_curtidas

router = APIRouter()

MODEL_NAME = "curtida"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

# Routers para curtidas
@model_router.post("/curtir", summary="Endpoint para curtir um produto")
async def post_curtir(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_curtidas.save_curtidas(
        db=db, id_produto=id_produto, usuario=usuario
    )


@model_router.get("/curtidas", summary="Endpoint para pegar todos os produtos curtidos")
async def get_curtidas(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_curtidas.get_curtidas(db=db, usuario=usuario)


@model_router.delete("/descurtir", summary="Endpoint para descurtir um produto")
async def delete_descurtir(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_curtidas.delete_curtidas(
        db=db, id_produto=id_produto, usuario=usuario
    )


router.include_router(model_router)
