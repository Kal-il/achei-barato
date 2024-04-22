from pydantic import Field
from usuario.usuario.schemas import UsuarioBase, UsuarioAuth


class ConsumidorBase(UsuarioBase):
    
    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(...,  max_length=255, description="Bairro")
    endereco: str = Field(...,  max_length=255, description="Endereço")
    complemento: str = Field(None,  max_length=255, description="Complemento")
    telefone: int = Field(..., description="Telefone")

class ConsumidorAuth(UsuarioAuth):

    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(...,  max_length=255, description="Bairro")
    endereco: str = Field(...,  max_length=255, description="Endereço")
    complemento: str = Field(None,  max_length=255, description="Complemento")
    numero_endereco: int = Field(..., description="Número do endereço")
    telefone: int = Field(..., description="Telefone")