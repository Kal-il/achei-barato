from typing import Annotated

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.api_mercados import schemas
from usuario.usuario.models import Usuario
from .use_cases import use_cases_api_mercados

router = APIRouter()

MODEL_NAME = "erp"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

# Routers Modelo ApiMercados

@model_router.post("/conexao", summary="Endpoint para dados de conexão com ERP")
async def post_erp_conexao(
    db: AsyncDBDependency,
    api_mercado: schemas.ApiMercados,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_api_mercados.save_dados_conexao(
        db=db, api_mercado=api_mercado, usuario=usuario
    )


@model_router.get(
    "/conexao", summary="Endpoint para pegar os dados de conexão com ERP"
)
async def get_erp_conexao(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_api_mercados.get_dados_conexao(db=db, usuario=usuario)


@model_router.delete(
    "/conexao", summary="Endpoint para deletar os dados de conexão com ERP"
)
async def delete_erp_conexao(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_api_mercados.delete_dados_conexao(db=db, usuario=usuario)


@model_router.put(
    "/conexao", summary="Endpoint para atualizar os dados de conexão com ERP"
)
async def put_erp_conexao(
    db: AsyncDBDependency,
    api_mercado: schemas.ApiMercados,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_api_mercados.update_dados_conexao(
        db=db, api_mercado=api_mercado, usuario=usuario
    )

router.include_router(model_router)