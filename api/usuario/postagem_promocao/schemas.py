import re
from typing import Optional
import uuid
from pydantic import ConfigDict, EmailStr, Field
from usuario.usuario.schemas import UsuarioBase, UsuarioAuth
from pydantic import BaseModel

class PostagemPromocaoBase(BaseModel):
    legenda: str = Field(..., max_length=255, description="Legenda")
    denuncia: bool = Field(..., max_length=255, description="Estado")
    imagem: str = Field(..., max_length=255, description="Imagem")


class PostagemPromocaoCreate(PostagemPromocaoBase):
    pass