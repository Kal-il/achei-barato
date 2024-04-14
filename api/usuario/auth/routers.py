from typing import Annotated, Any
from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordRequestForm
from api.core.database import AsyncDBDependency
from api.usuario.auth import schemas
from api.usuario.auth.use_cases import AuthUseCase

router = APIRouter()

MODEL_NAME = "auth"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.post("/login", summary=f"Login usuário")
async def login(db: AsyncDBDependency, data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> schemas.TokenSchema:
    return await AuthUseCase.authenticate(db, data.username, data.password)


@model_router.post("/refresh", summary="Atualiza token de acesso")
async def refresh_token(db: AsyncDBDependency, data: schemas.RefreshTokenSchema) -> schemas.TokenSchema:
    return await AuthUseCase.refresh_access_token(db, data.refresh_token)


router.include_router(model_router)
