from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from api.core.database import AsyncDBDependency
from api.usuario.usuario import schemas
from api.usuario.usuario.use_cases import UsuarioUseCase

router = APIRouter()

MODEL_NAME = "usuario"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)


@model_router.get("/", summary=f"Testar")
async def get_usuarios(db: AsyncDBDependency) -> str:
    return "Listar usuarios"


@model_router.post("/login", summary=f"Logar usuário")
async def login(
    db: AsyncDBDependency, data: OAuth2PasswordRequestForm = Depends()
) -> schemas.TokenSchema:
    return await UsuarioUseCase.authenticate(db, data.username, data.password)


@model_router.post("/register", summary=f"Registrar")
async def create_user(db: AsyncDBDependency, data: schemas.UsuarioAuth) -> str:
    return await UsuarioUseCase.create_usuario(db, data)


router.include_router(model_router)
