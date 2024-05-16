from typing import Annotated
from urllib import response
from uuid import UUID

from pydantic import EmailStr
from core.security import get_current_active_user
from usuario.usuario.models import Usuario
from fastapi import APIRouter, Depends, File, UploadFile
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
async def create_user(db: AsyncDBDependency, data: schemas.ConsumidorAuth, foto: UploadFile = File(...)):
    return await ConsumidorUseCase.create_consumidor(db, data, foto)


@model_router.post("/create/google", summary=f"Criar Consumidor com Google", response_model=schemas.ConsumidorBase)
async def create_consumidor_google(db: AsyncDBDependency, data: schemas.ConsumidorGoogle):
    return await ConsumidorUseCase.create_consumidor_google(db, data)

@model_router.get("/consultar", summary="Obtém dados do consumidor logado")
async def get_consumidor_data(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await ConsumidorUseCase.get_consumidor_data(db, usuario.id)

@model_router.get("/consultar/{id_consumidor}", summary="Obtém dados do consumidor pelo ID")
async def get_consumidor_data_by_id(db: AsyncDBDependency, id_usuario: UUID):
    return await ConsumidorUseCase.get_consumidor_data(db, id_usuario)

@model_router.put("/atualizar", summary="Atualiza dados do consumidor")
async def update_consumidor_data(db: AsyncDBDependency, new_consumidor: schemas.ConsumidorUpdate, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await ConsumidorUseCase.update_consumidor_data(db, usuario.id, new_consumidor)

@model_router.put("/atualizar/{id_consumidor}", summary="Atualiza dados do consumidor pelo ID", response_model=schemas.ConsumidorSchema)
async def update_consumidor_data_by_id(db: AsyncDBDependency, id_consumidor: UUID, new_consumidor: schemas.ConsumidorUpdate):
    return await ConsumidorUseCase.update_consumidor_data(db, id_consumidor, new_consumidor)

@model_router.delete("/deletar", summary="Deleta consumidor")
async def delete_consumidor(db: AsyncDBDependency, usuario: Annotated[Usuario, Depends(get_current_active_user)]):
    return await ConsumidorUseCase.delete_consumidor(db, usuario.id)

@model_router.delete("/deletar/{id_consumidor}", summary="Deleta consumidor pelo ID")
async def delete_consumidor_by_id(db: AsyncDBDependency, id_consumidor: UUID):
    return await ConsumidorUseCase.delete_consumidor(db, id_consumidor)

@model_router.post("/restaurar/{email}", summary="Restaura a conta do consumidor através do e-mail")
async def restore_consumidor(db: AsyncDBDependency, email: EmailStr):
    return await ConsumidorUseCase.restore_consumidor_by_email(db, email)

@model_router.get("/foto")
async def get_foto_consumidor(db: AsyncDBDependency):
    return await ConsumidorUseCase.get_foto_consumidor(db)
    
@model_router.post("/foto")
async def upload_foto_consumidor(db: AsyncDBDependency, foto: UploadFile = File(...)):
    return await ConsumidorUseCase.upload_photo(db, foto)
    


router.include_router(model_router)
