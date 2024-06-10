from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from usuario.usuario.models import Usuario
from .use_cases import use_cases_produtos
from .schemas import ProdutoBase
router = APIRouter()

MODEL_NAME = "produto"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.post(
    "/sync-produtos", summary="Sincroniza base de produtos com ERP"
)
async def sync_produtos(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    produtos = []
    for i in range(0, 10):
        produto = ProdutoBase(
            nome=f"pão de queijo {i}",
            marca="pão de acúcar",
            data_validade=datetime.now().date().strftime("%d/%m/%Y"),
            gtin_produto="",
            mpn_produto="",
            id_produto_erp="",
            codigo_produto="",
            ncm_produto="0402.10.90",
            preco=5.00,
            preco_promocional=3.50,
            descricao="pão de queijo do bom",
        )

        produtos.append(produto)

    return await use_cases_produtos.sync_produtos(db, produtos, usuario)


@model_router.post("/cadastrar", summary="Cadastrar produto")
async def cadastrar_produto(
    db: AsyncDBDependency,
    produto: ProdutoBase,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_produtos.cadastrar_produto(
        db=db, produto=produto, usuario=usuario
    )


@model_router.get("/produtos", summary="Obtém todos os produtos do mercado")
async def get_produtos(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await use_cases_produtos.get_produtos(db=db, usuario=usuario)


@model_router.get(
    "/{id_produto}",
    summary="Obtém produto através do ID",
    response_model=ProdutoBase,
)
async def sync_produtos(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_produtos.get_produto_by_id(
        db=db, id_produto=id_produto, usuario=usuario
    )


@model_router.get(
    "/sync_erp", summary="Sincroniza produtos em promoção do ERP"
)
async def teste_auth_erp(
    usuario: Annotated[Usuario, Depends(get_current_active_user)], db: AsyncDBDependency
):
    return await use_cases_produtos.sync_produtos_promocao_erp(usuario=usuario, db=db)


router.include_router(model_router)