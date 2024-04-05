from fastapi import APIRouter
from core.database import AsyncDBDependency

router = APIRouter()

MODEL_NAME = "usuario"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.get("/", summary=f"Testar")
async def get_usuarios(
    db: AsyncDBDependency,
) -> str:
    return "Listar usuarios"


router.include_router(model_router)