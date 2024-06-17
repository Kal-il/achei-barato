from typing import Annotated
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, UploadFile, File
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
async def create_user(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)], data: schemas.PostagemPromocaoBase = Depends(), foto: UploadFile = File(...)):
    return await postagem_promocao_usecases.create_postagem_promocao(db, data, foto, usuario)

@model_router.get("/consultar/usuario", summary="Obtém todas as postagens do usuário")
async def get_postagem_promocao_by_id(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await postagem_promocao_usecases.get_postagem_promocao_by_usuario(db, usuario)

@model_router.get("/consultar", summary="Obtém todas as postagens")
async def get_all_postagem_promocao(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await postagem_promocao_usecases.get_all_postagem_promocao(db)

@model_router.delete("/deletar/{id_postagem}", summary="Deleta postagem pelo ID")   
async def delete_postagem_promocao(db: AsyncDBDependency, id_postagem: str, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await postagem_promocao_usecases.delete_postagem_promocao(db, id_postagem)

@model_router.post("/denunciar/{id_postagem}", summary="Denunciar postagem pelo ID")
async def denunciar_postagem(id_postagem: str, background_tasks: BackgroundTasks, db: AsyncDBDependency):
    return await postagem_promocao_usecases.denunciar_postagem_promocao(db, id_postagem, background_tasks)

router.include_router(model_router)