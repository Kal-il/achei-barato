from typing import Annotated, Any
from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordRequestForm
from api.core.database import AsyncDBDependency
from api.usuario.usuario import schemas
from api.usuario.usuario.use_cases import UsuarioUseCase
from api.usuario.usuario.models import Usuario
from api.core.security import get_current_active_user

router = APIRouter()

MODEL_NAME = "usuario"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.get("/eu", response_model=schemas.UsuarioBaseSchema)
async def read_users_me(current_user: Annotated[Usuario, Depends(get_current_active_user)],):
    return current_user


@model_router.post("/register", summary=f"Registrar", response_model=schemas.UsuarioBaseSchema)
async def create_user(db: AsyncDBDependency, data: schemas.UsuarioAuth):
    return await UsuarioUseCase.create_usuario(db, data)


router.include_router(model_router)
