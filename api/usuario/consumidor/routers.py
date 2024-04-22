from fastapi import APIRouter
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
router.include_router(model_router)
