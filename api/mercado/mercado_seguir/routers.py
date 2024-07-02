from typing import Annotated, Optional

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from .use_cases import use_cases_seguir_mercado
from usuario.usuario.models import Usuario

router = APIRouter()

MODEL_NAME = "seguir"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

# Routers Mercado Seguir
@model_router.get(
    "/seguidos/usuario",
    summary="Endpoint para buscar os mercados seguidos de um usuário",
)
async def mercado_seguidos(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_seguir_mercado.get_mercados_seguidos(db=db, usuario=usuario)


@model_router.post("/seguir/", summary="Endpoint para seguir um mercado")
async def mercado_seguir(
    db: AsyncDBDependency,
    id_mercado: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_seguir_mercado.seguir_mercado(
        db=db, id_mercado=id_mercado, usuario=usuario
    )


@model_router.delete(
    "/deixar-de-seguir/", summary="Endpoint para deixar de seguir um mercado"
)
async def mercado_deixar_de_seguir(
    db: AsyncDBDependency,
    id_mercado: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_seguir_mercado.deixar_de_seguir(
        db=db, id_mercado=id_mercado, usuario=usuario
    )


@model_router.get(
    "/seguidores/",
    summary="Endpoint para buscar o número dos mercados seguidos do usuário",
)
async def mercado_seguidores(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_seguir_mercado.get_mercado_numero_seguidos(
        db=db, usuario=usuario
    )


@model_router.get(
    "/seguidores/mercado",
    summary="Endpoint para buscar o número de seguidores de um mercado",
)
async def mercado_seguidores_mercado(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    id_mercado: Optional[str] = None,
):
    return await use_cases_seguir_mercado.get_mercado_numero_seguindo(
        db=db, id_mercado=id_mercado, usuario=usuario
    )



router.include_router(model_router)