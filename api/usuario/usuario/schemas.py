from pydantic import BaseModel, EmailStr, Field

class UsuarioAuth(BaseModel):
    nome: str = Field(..., max_length=255, description="Nome do usuário")
    email: EmailStr = Field(..., description="E-mail do usuário")
    password: str = Field(..., min_length=5, max_length=255, description="Senha do usuário")

class TokenSchema(BaseModel):
    access_token: str
    token_type: str
