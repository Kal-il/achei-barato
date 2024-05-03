from typing import Annotated
from urllib import response
from core.security import get_current_active_user
from usuario.usuario.models import Usuario
from fastapi import APIRouter, Depends
from core.database import AsyncDBDependency
from usuario.consumidor import schemas
from usuario.consumidor.use_cases import ConsumidorUseCase
router = APIRouter()

MODEL_NAME = "consumidor"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.post("/create", summary=f"Criar Consumidor", response_model=schemas.ConsumidorBase)
async def create_user(db: AsyncDBDependency, data: schemas.ConsumidorAuth):
    return await ConsumidorUseCase.create_consumidor(db, data)


@model_router.post("/create/google", summary=f"Criar Consumidor com Google", response_model=schemas.ConsumidorBase)
async def create_consumidor_google(db: AsyncDBDependency, data: schemas.ConsumidorGoogle):
    return await ConsumidorUseCase.create_consumidor_google(db, data)

@model_router.get("/consultar", summary="Obtém dados do consumidor logado")
async def get_consumidor_data(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await ConsumidorUseCase.get_consumidor_data(db, usuario)

@model_router.put("/atualizar", summary="Atualiza dados do consumidor")
async def update_consumidor_data(db: AsyncDBDependency, new_consumidor: schemas.ConsumidorUpdate):
    return await ConsumidorUseCase.update_consumidor_data(db, new_consumidor)

router.include_router(model_router)