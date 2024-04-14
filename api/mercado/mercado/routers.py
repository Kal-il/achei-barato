from fastapi import APIRouter, Depends

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)




router.include_router(model_router)
