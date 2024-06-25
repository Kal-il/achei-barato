from typing import Annotated, List

from fastapi import APIRouter, Depends, BackgroundTasks

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado import schemas
from usuario.usuario.models import Usuario
from .use_cases import use_cases_mercado
router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.get(
    "/", summary="Pesquisar mercados por nome", response_model=List[schemas.MercadoSchema]
)
async def get_mercado_by_nome(db: AsyncDBDependency, nome: str):
    return await use_cases_mercado.get_mercado_by_nome(db=db, nome=nome)


@model_router.post("/cadastrar", summary="Cadastrar mercado.")
async def cadastrar_mercado(
    db: AsyncDBDependency,
    data: schemas.MercadoSchema,
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

    return await use_cases_mercado.cadastrar_mercado(
        db=db, data=mercado_data, background_tasks=background_tasks
    )


@model_router.get(
    "/obter",
    summary="Obter mercado pelo token do usuário autenticado",
    response_model=schemas.MercadoSchema,
)
async def get_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await use_cases_mercado.get_mercado_by_usuario(db=db, usuario=usuario)


@model_router.put("/editar", summary="Editar dados do mercado")
async def update_mercado(
    db: AsyncDBDependency,
    mercado: schemas.MercadoUpdate,
    usuario: Annotated[Usuario, Depends(get_current_active_user)],
):
    return await use_cases_mercado.update_mercado(
        db=db, novo_mercado=mercado, usuario=usuario
    )


@model_router.delete("/deletar", summary="Deletar mercado")
async def delete_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await use_cases_mercado.delete_mercado(db=db, usuario=usuario)


@model_router.post("/restaurar", summary="Restaurar mercado")
async def restore_mercado(
    db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]
):
    return await use_cases_mercado.restore_mercado(db=db, usuario=usuario)


router.include_router(model_router)