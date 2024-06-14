from typing import Annotated

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.promocao import schemas
from .use_cases import use_cases_promocoes
from usuario.usuario.models import Usuario

router = APIRouter()

MODEL_NAME = "promocao"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


# Endpoints relacionados com promoções
@model_router.post(
    "/cadastrar", summary="Endpoint para cadastro manual de promoções"
)
async def promocao_cadastrar(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    promocao: schemas.PromocaoBase,
):
    return await use_cases_promocoes.cadastrar_promocao(
        db=db, usuario=usuario, promocao=promocao
    )


@model_router.get("/", summary="Retorna todas as promoções de um mercado")
async def promocoes_mercado(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_promocoes.get_promocoes(db=db, usuario=usuario)


@model_router.get(
    "/promocoes/{id_mercado}",
    summary="Retorna todas as promoções de um mercado pelo seu ID",
)
async def promocoes_mercado_por_id(
    db: AsyncDBDependency,
    id_mercado: str,
):
    return await use_cases_promocoes.get_promocoes_mercado(db, id_mercado)

@model_router.get(
    "/produtos/{id_promocao}",
    summary="Retorna todos os produtos de uma promoção",
)
async def promocoes_mercado_por_id(
    db: AsyncDBDependency,
    id_promocao: str,
):
    return await use_cases_promocoes.get_produtos_promocao(db, id_promocao)

router.include_router(model_router)
