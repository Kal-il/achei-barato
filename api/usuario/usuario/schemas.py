from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
import uuid


class UsuarioBaseSchema(BaseModel):

    nome: str = Field(..., max_length=255, description="Nome do usuário")
    id: uuid.UUID = Field(..., description="Identificador único do usuário")
    email: EmailStr = Field(..., description="E-mail do usuário")
    is_active: bool = Field(default=True, description="Usuário ativo")
    is_superuser: bool = Field(default=False, description="Usuário superuser")
    created_at: datetime = Field(..., description="Data de criação do usuário")
    updated_at: datetime = Field(..., description="Data de atualização do usuário")
    deleted: bool = Field(default=False, description="Usuário deletado")


class UsuarioAuth(BaseModel):
    nome: str = Field(..., max_length=255, description="Nome do usuário")
    email: EmailStr = Field(..., description="E-mail do usuário")
    password: str = Field(
        ..., min_length=5, max_length=255, description="Senha do usuário"
    )


class UsuarioLogin(BaseModel):
    username: str
    password: str

