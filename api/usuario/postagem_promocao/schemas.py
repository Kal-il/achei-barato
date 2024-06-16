import re
from typing import Optional
import uuid
from pydantic import ConfigDict, EmailStr, Field
from usuario.usuario.schemas import UsuarioBase, UsuarioAuth
from pydantic import BaseModel

class PostagemPromocaoBase(BaseModel):
    legenda: str = Field(..., max_length=255, description="Legenda")
    denuncia: Optional[bool]= False 
    

class PostagemPromocaoCreate(PostagemPromocaoBase):
    pass