from datetime import datetime
from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, BackgroundTasks

from mercado.mercado.models import Mercado
from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado import schemas
from mercado.mercado.usecases import (
    mercado_usecases,
    produto_usecases,
    api_mercados_usecases,
    curtidas_usecases,
    mercado_seguir_usecases,
    promocao_usecases
)
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

    return await mercado_usecases.cadastrar_mercado(
        db=db, data=mercado_data, background_tasks=background_tasks
    )


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


@model_router.post("/cadastrar/produto", summary="Cadastrar produto")
async def cadastrar_produto(
    db: AsyncDBDependency,
    produto: schemas.ProdutoBase,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await produto_usecases.cadastrar_produto(
        db=db, produto=produto, usuario=usuario
    )


@model_router.get("/produtos", summary="Obtém todos os produtos do mercado")
async def get_produtos(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await produto_usecases.get_produtos(db=db, usuario=usuario)


@model_router.get(
    "/produtos/{id_produto}",
    summary="Obtém produto através do ID",
    response_model=schemas.ProdutoBase,
)
async def sync_produtos(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await produto_usecases.get_produto_by_id(
        db=db, id_produto=id_produto, usuario=usuario
    )


@model_router.get(
    "/sync/promocao/erp", summary="Sincroniza produtos em promoção do ERP"
)
async def teste_auth_erp(
    usuario: Annotated[Usuario, Depends(get_current_active_user)], db: AsyncDBDependency
):
    return await produto_usecases.sync_produtos_promocao_erp(usuario=usuario, db=db)


# Routers Modelo ApiMercados


@model_router.post("/erp/conexao", summary="Endpoint para dados de conexão com ERP")
async def post_erp_conexao(
    db: AsyncDBDependency,
    api_mercado: schemas.ApiMercados,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await api_mercados_usecases.save_dados_conexao(
        db=db, api_mercado=api_mercado, usuario=usuario
    )


@model_router.get(
    "/erp/conexao", summary="Endpoint para pegar os dados de conexão com ERP"
)
async def get_erp_conexao(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await api_mercados_usecases.get_dados_conexao(db=db, usuario=usuario)


@model_router.delete(
    "/erp/conexao", summary="Endpoint para deletar os dados de conexão com ERP"
)
async def delete_erp_conexao(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await api_mercados_usecases.delete_dados_conexao(db=db, usuario=usuario)


@model_router.put(
    "/erp/conexao", summary="Endpoint para atualizar os dados de conexão com ERP"
)
async def put_erp_conexao(
    db: AsyncDBDependency,
    api_mercado: schemas.ApiMercados,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await api_mercados_usecases.update_dados_conexao(
        db=db, api_mercado=api_mercado, usuario=usuario
    )


# Routers para curtidas


@model_router.post("/curtir", summary="Endpoint para curtir um produto")
async def post_curtir(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await curtidas_usecases.save_curtidas(
        db=db, id_produto=id_produto, usuario=usuario
    )


@model_router.get("/curtidas", summary="Endpoint para pegar todos os produtos curtidos")
async def get_curtidas(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await curtidas_usecases.get_curtidas(db=db, usuario=usuario)


@model_router.delete("/descurtir", summary="Endpoint para descurtir um produto")
async def delete_descurtir(
    db: AsyncDBDependency,
    id_produto: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await curtidas_usecases.delete_curtidas(
        db=db, id_produto=id_produto, usuario=usuario
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
    return await mercado_seguir_usecases.get_mercados_seguidos(db=db, usuario=usuario)


@model_router.post("/seguir/", summary="Endpoint para seguir um mercado")
async def mercado_seguir(
    db: AsyncDBDependency,
    id_mercado: str,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await mercado_seguir_usecases.seguir_mercado(
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
    return await mercado_seguir_usecases.deixar_de_seguir(
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
    return await mercado_seguir_usecases.get_mercado_numero_seguidos(
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
    return await mercado_seguir_usecases.get_mercado_numero_seguindo(
        db=db, id_mercado=id_mercado, usuario=usuario
    )


# Endpoints relacionados com promoções
@model_router.post(
    "/promocao/cadastrar", summary="Endpoint para cadastro manual de promoções"
)
async def promocao_cadastrar(
    db: AsyncDBDependency,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
    promocao: schemas.PromocaoBase,
):
    return await promocao_usecases.cadastrar_promocao(
        db=db, usuario=usuario, promocao=promocao
    )


router.include_router(model_router)
