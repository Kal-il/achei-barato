from typing import Annotated

from fastapi import APIRouter, Depends

from core.database import AsyncDBDependency
from core.security import get_current_active_user
from mercado.mercado.schemas import MercadoCreate, Mercado
from mercado.mercado.use_cases import mercado_usecases
from usuario.usuario.models import Usuario
from usuario.usuario.schemas import UsuarioBase

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.post("/cadastrar", summary="Cadastrar mercado.")
async def cadastrar_mercado(db: AsyncDBDependency, data: Mercado, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    mercado_data = MercadoCreate(
        cnpj=data.cnpj,
        razao_social=data.razao_social,
        nome_fantasia=data.nome_fantasia,
        telefone=data.telefone,
        cep=data.cep,
        estado=data.estado,
        cidade=data.cidade,
        bairro=data.bairro,
        endereco=data.endereco,
        numero_endereco=data.numero_endereco,
        complemento=data.complemento,
        nome_responsavel=data.nome_responsavel,
        cpf_responsavel=data.cpf_responsavel,
        usuario=usuario
    )

    return await mercado_usecases.cadastrar_mercado(db=db, data=mercado_data)


router.include_router(model_router)
