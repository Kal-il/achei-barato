import datetime
import uuid
from pydantic import BaseModel, Field
from typing import Optional


class MercadoCreate(BaseModel):
    cnpj: str = Field(..., max_length=18, description="CNPJ")
    razao_social: str = Field(..., description="Razão social")
    nome_fantasia: str = Field(..., description="Nome fantasia")
    telefone: int = Field(..., description="Telefone")
    cep: str = Field(..., max_length=9, description="CEP")
    estado: str = Field(..., max_length=255, description="Estado")
    cidade: str = Field(..., max_length=255, description="Cidade")
    bairro: str = Field(..., max_length=255, description="Bairro")
    endereco: str = Field(..., max_length=255, description="Endereço")
    numero_endereco: int = Field(..., description="Número")
    complemento: Optional[str] = Field(..., max_length=255, description="Complemento")
    nome_responsavel: str = Field(..., max_length=255, description="Nome do responsável")
    cpf_responsavel: str = Field(..., max_length=14, description="CPF do responsável")

class ProdutoCreate(BaseModel):
    nome: str = Field(..., description="Nome do produto")
    marca: str = Field(..., description="Marca do produto")
    preco: float = Field(..., description="Preço do produto")
    descricao: Optional[str] = Field(..., description="Descrição do produto")
    mercado_id: str = Field(..., description="ID do mercado")
    ncm_produto: str = Field(..., description="NCM do produto")
    gtin_produto: str = Field(..., description="GTIN do produto")
    mpn_produto: str = Field(..., description="MPN do produto")
    codigo_produto: str = Field(..., description="Código do produto")
    preco_promocional: float = Field(..., description="Preço promocional do produto")
    data_validade: datetime.datetime = Field(..., description="Data de validade do produto")

