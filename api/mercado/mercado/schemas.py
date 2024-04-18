from typing import Optional
from pydantic import BaseModel, Field


class MercadoBase(BaseModel):
    cnpj: str = Field(..., max_length=14, description="CNPJ")
    razao_social: str = Field(..., max_length=255, description="Razão social")
    nome_fantasia: str = Field(..., max_length=255, description="Nome fantasia")
    telefone: int = Field(..., description="Telefone")
    cep: str = Field(..., max_length=8, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    numero_endereco: str = Field(..., max_length=255, description="Número")
    complemento: Optional[str] = Field(..., max_length=255, description="Complemento")
    nome_responsavel: str = Field(..., max_length=255, description="Nome do responsável")
    cpf_responsavel: str = Field(..., max_length=11, description="CPF do responsável")

class MercadoCreate(MercadoBase):
    pass

class MercadoUpdate(MercadoBase):
    pass
