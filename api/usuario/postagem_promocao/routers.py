from typing import Annotated

from fastapi import APIRouter, Depends, UploadFile
from core.security import get_current_active_user
from usuario.usuario.models import Usuario
from usuario.postagem_promocao import schemas
from core.database import AsyncDBDependency
from usuario.postagem_promocao.use_cases import postagem_promocao_usecases


router = APIRouter()

MODEL_NAME = "postagem_promocao"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.post("/postar", summary=f"Postar Promoção")
async def create_user(db: AsyncDBDependency, data: schemas.PostagemPromocaoCreate, foto: UploadFile,  usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await postagem_promocao_usecases.create_postagem_promocao(db, data, foto, usuario)

# @model_router.get("/consultar/{id_postagem}", summary="Obtém dados da postagem pelo ID")
# async def get_postagem_promocao_by_id(db: AsyncDBDependency, id_postagem: str):
#     return await postagem_promocao_usecases.get_postagem_promocao_by_id(db, id_postagem)

# @model_router.get("/consultar", summary="Obtém todas as postagens")
# async def get_all_postagem_promocao(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
#     return await postagem_promocao_usecases.get_all_postagem_promocao(db)

# @model_router.put("/atualizar/{id_postagem}", summary="Atualiza dados da postagem pelo ID")
# async def update_postagem_promocao(db: AsyncDBDependency, id_postagem: str, data: schemas.PostagemPromocaoUpdate):
#     return await postagem_promocao_usecases.update_postagem_promocao(db, id_postagem, data)

# @model_router.delete("/deletar/{id_postagem}", summary="Deleta postagem pelo ID")   
# async def delete_postagem_promocao(db: AsyncDBDependency, id_postagem: str):
#     return await postagem_promocao_usecases.delete_postagem_promocao(db, id_postagem)

# @model_router.post("/denunciar/{id_postagem}", summary="Denunciar postagem pelo ID")
# async def denunciar_postagem_promocao(db: AsyncDBDependency, id_postagem: str):
#     return await postagem_promocao_usecases.denunciar_postagem_promocao(db, id_postagem)

router.include_router(model_router)