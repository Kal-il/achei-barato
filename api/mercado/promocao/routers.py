from typing import Annotated, List
import uuid

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.produto.schemas import ProdutoBase, ProdutoOutput
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
@model_router.post("/cadastrar", summary="Endpoint para cadastro manual de promoções")
async def promocao_cadastrar(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    promocao: schemas.PromocaoCreateManual,
):
    return await use_cases_promocoes.cadastrar_promocao_manual(
        db=db, usuario=usuario, promocao=promocao
    )


@model_router.get(
    "/",
    summary="Retorna todas as promoções do mercado que está logado",
    response_model=List[ProdutoOutput],
)
async def promocoes_mercado(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_promocoes.get_promocoes(db=db, usuario=usuario)

@model_router.get(
    "/erp/{id_produto}",
    summary="Retorna o produto em promoção de um sistema ERP sincronizado",
    response_model=ProdutoOutput,
)
async def get_promocao_erp(
    db: AsyncDBDependency, id_produto: uuid.UUID
):
    return await use_cases_promocoes.get_produto_erp(db, id_produto)

@model_router.get(
    "/{id_promocao}",
    summary="Retorna os dados de uma promoção de um mercado, junto com os produtos em promoção",
    response_model=schemas.PromocaoComProdutos,
)
async def get_promocao(
    db: AsyncDBDependency, id_promocao: uuid.UUID
):
    return await use_cases_promocoes.get_promocao(db, id_promocao)


@model_router.delete("/{id_promocao}", summary="Deleta uma promoção")
async def deletar_promocao(
    db: AsyncDBDependency,
    id_promocao: uuid.UUID,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_promocoes.deletar_promocao(db, id_promocao, usuario)


@model_router.put(
    "/{id_promocao}",
    summary="Atualiza uma promoção",
    response_model=schemas.PromocaoSchema,
)
async def atualizar_promocao(
    db: AsyncDBDependency,
    id_promocao: uuid.UUID,
    nova_promocao: schemas.PromocaoUpdate,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_promocoes.atualizar_promocao(
        db, id_promocao, nova_promocao, usuario
    )


@model_router.get(
    "/promocoes/{id_mercado}",
    summary="Retorna todas as promoções de um mercado pelo seu ID",
    response_model=List[ProdutoOutput],
)
async def promocoes_mercado_por_id(
    db: AsyncDBDependency,
    id_mercado: uuid.UUID,
):
    return await use_cases_promocoes.get_produtos_promocoes_mercado(db, id_mercado)


@model_router.get(
    "/{id_promocao}/produtos/",
    summary="Retorna todos os produtos de uma promoção",
    response_model=List[ProdutoBase],
)
async def promocoes_todos_produtos(
    db: AsyncDBDependency,
    id_promocao: uuid.UUID,
):
    return await use_cases_promocoes.get_produtos_promocao(db, id_promocao)


router.include_router(model_router)
