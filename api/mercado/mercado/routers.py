from datetime import datetime
from typing import Annotated, List

from fastapi import APIRouter, Depends, BackgroundTasks

from mercado.mercado.models import Mercado
from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado import schemas
from mercado.mercado.use_cases import mercado_usecases, produto_usecases
from usuario.usuario.models import Usuario
from mercado.mercado.erp_requests import ErpRequest

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.get(
    "/", summary="Pesquisar mercados por nome", response_model=List[schemas.Mercado]
)
async def get_mercado_by_nome(db: AsyncDBDependency, nome: str):
    return await mercado_usecases.get_mercado_by_nome(db=db, nome=nome)


@model_router.post("/cadastrar", summary="Cadastrar mercado.")
async def cadastrar_mercado(
    db: AsyncDBDependency,
    data: schemas.Mercado,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    background_tasks: BackgroundTasks,
):
    mercado_data = schemas.MercadoCreate(
        cnpj=data.cnpj,
        razao_social=data.razao_social,
        nome_fantasia=data.nome_fantasia,
        telefone=data.telefone,
        descricao=data.descricao,
        cep=data.cep,
        estado=data.estado,
        cidade=data.cidade,
        bairro=data.bairro,
        endereco=data.endereco,
        numero_endereco=data.numero_endereco,
        complemento=data.complemento,
        nome_responsavel=data.nome_responsavel,
        cpf_responsavel=data.cpf_responsavel,
        usuario=usuario,
    )

    return await mercado_usecases.cadastrar_mercado(db=db, data=mercado_data, background_tasks=background_tasks)


@model_router.get(
    "/obter",
    summary="Obter mercado pelo token do usuário autenticado",
    response_model=schemas.Mercado,
)
async def get_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await mercado_usecases.get_mercado_by_usuario(db=db, usuario=usuario)


@model_router.put("/editar", summary="Editar dados do mercado")
async def update_mercado(
    db: AsyncDBDependency,
    mercado: schemas.MercadoUpdate,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await mercado_usecases.update_mercado(
        db=db, novo_mercado=mercado, usuario=usuario
    )


@model_router.delete("/deletar", summary="Deletar mercado")
async def delete_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await mercado_usecases.delete_mercado(db=db, usuario=usuario)


@model_router.post("/restaurar", summary="Restaurar mercado")
async def restore_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await mercado_usecases.restore_mercado(db=db, usuario=usuario)


@model_router.post(
    "/produtos/sync-produtos", summary="Sincroniza base de produtos com ERP"
)
async def sync_produtos(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    produtos = []
    for i in range(0, 10):
        produto = schemas.ProdutoBase(
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

    return await produto_usecases.sync_produtos(db, produtos, usuario)


@model_router.get("/produtos", summary="Obtém todos os produtos do mercado")
async def get_produtos(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await produto_usecases.get_produtos(db=db, usuario=usuario)
    
@model_router.get("/produtos/{id_produto}", summary="Obtém produto através do ID", response_model=schemas.ProdutoBase)
async def sync_produtos(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await produto_usecases.get_produto_by_id(
        db=db, id_produto=id_produto, usuario=usuario
    )

@model_router.get("/sync/promocao/erp", summary="Sincroniza produtos em promoção do ERP")
async def teste_auth_erp(usuario: Annotated[Usuario, Depends(get_current_active_user)], db: AsyncDBDependency):
    return await produto_usecases.sync_produtos_promocao_erp(usuario=usuario, db=db)

router.include_router(model_router)
