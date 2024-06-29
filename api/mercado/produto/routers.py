from datetime import datetime
from typing import Annotated, List
import uuid

from fastapi import APIRouter, Depends, File, UploadFile

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from usuario.usuario.models import Usuario
from .use_cases import use_cases_produtos
from .schemas import ProdutoBase, ProdutoOutput, ProdutoPromocaoOutput
router = APIRouter()

MODEL_NAME = "produto"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.get("/todos", summary="Retorna todos os produtos em promoção")
async def get_todos_produtos(db: AsyncDBDependency):
    return await use_cases_produtos.get_todos_produtos(db)


@model_router.get(
    "/sync_erp", summary="Sincroniza produtos em promoção do ERP"
)
async def teste_auth_erp(
    usuario: Annotated[Usuario, Depends(get_current_active_user)], db: AsyncDBDependency
):
    return await use_cases_produtos.sync_produtos_promocao_erp(usuario=usuario, db=db)

# @model_router.post(
#     "/sync-produtos", summary="Sincroniza base de produtos com ERP"
# )
# async def sync_produtos(
#     db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
# ):
#     produtos = []
#     for i in range(0, 10):
#         produto = ProdutoBase(
#             nome=f"pão de queijo {i}",
#             marca="pão de acúcar",
#             data_validade=datetime.now().date().strftime("%d/%m/%Y"),
#             gtin_produto="",
#             mpn_produto="",
#             id_produto_erp="",
#             codigo_produto="",
#             ncm_produto="0402.10.90",
#             preco=5.00,
#             preco_promocional=3.50,
#             descricao="pão de queijo do bom",
#         )

#         produtos.append(produto)

#     return await use_cases_produtos.sync_produtos(db, produtos, usuario)


@model_router.post("/cadastrar", summary="Cadastrar produto")
async def cadastrar_produto(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    produto: ProdutoBase = Depends(),
    foto: UploadFile = File(...),
):
    return await use_cases_produtos.cadastrar_produto(
        db=db, produto=produto, usuario=usuario, imagem=foto
    )


@model_router.get("/produtos", summary="Obtém todos os produtos do mercado")
async def get_produtos(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await use_cases_produtos.get_produtos(db=db, usuario=usuario)


@model_router.get(
    "/{id_produto}",
    summary="Obtém produto através do ID dentro do ERP da empresa",
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

@model_router.get("/uuid/{id_produto}", summary="Obtém produto pelo seu UUID", response_model=ProdutoOutput)
async def get_produto_por_uuid(db: AsyncDBDependency, id_produto: uuid.UUID):
    return await use_cases_produtos.get_produto_by_uuid(db, id_produto)


@model_router.post(
    "/pesquisar/nome/", summary="Pesquisar por nome por produto e mercado"
)
async def pesquisar_nome_produto_mercado(
    usuario: Annotated[Usuario, Depends(get_current_active_user)], db: AsyncDBDependency, nome:str
):
    return await use_cases_produtos.pesquisar_nome(db=db, nome=nome)

router.include_router(model_router)
