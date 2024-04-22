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

@model_router.post("/register/", summary=f"Registrar Consumidor", response_model=schemas.ConsumidorBase)
async def create_user(db: AsyncDBDependency, data: schemas.ConsumidorAuth):
    return await ConsumidorUseCase.create_consumidor(db, data)

router.include_router(model_router)
