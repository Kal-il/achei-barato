from typing import Annotated, Any
from fastapi import APIRouter, Body, Depends
from fastapi.security import OAuth2PasswordRequestForm
from core.database import AsyncDBDependency
from usuario.auth import schemas
from usuario.auth.use_cases import AuthUseCase

router = APIRouter()

MODEL_NAME = "auth"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.post("/login", summary=f"Login usuário")
async def login(db: AsyncDBDependency, data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> schemas.TokenSchema | None:
    return await AuthUseCase.authenticate(db, data.username, data.password)


@model_router.post("/refresh", summary="Atualiza token de acesso")
async def refresh_token(db: AsyncDBDependency, data: schemas.RefreshTokenSchema) -> schemas.TokenSchema:
    return await AuthUseCase.refresh_access_token(db, data.refresh_token)


@model_router.post("/google", summary="Endpoint para administrar registros e autenticação com Google")
async def auth_google(db: AsyncDBDependency, token: schemas.GoogleAuthSchema) -> schemas.TokenSchema:
    return await AuthUseCase.authenticate_google(db, token)

router.include_router(model_router)
