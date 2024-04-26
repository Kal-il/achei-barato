from typing import Annotated

from fastapi import APIRouter, Depends
from erp.mercado.script import MockDados
from core.database import AsyncDBDependency
from fastapi import HTTPException, status

router = APIRouter()

MODEL_NAME = "mercado"

model_router = APIRouter(
    prefix=f"/{MODEL_NAME}",
    tags=[f"{MODEL_NAME}"],
)

@model_router.get("/popular/banco", summary="Popular banco de dados.")
async def cadastrar_mercado(db: AsyncDBDependency):
    try:
        
        # await MockDados().popular_banco_tabela_mercado(db)
        await MockDados().popular_banco_tabela_produto(db)
    
    except Exception as e:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=e,
        )   
        
router.include_router(model_router)