import datetime
from typing import Optional, Any
import uuid
from pydantic import BaseModel, Field, validator


class ProdutoBase(BaseModel):
    nome: Optional[str] = Field(..., max_length=255, description="Nome")
    marca: Optional[str] = Field(..., max_length=255, description="Marca")
    data_validade: Optional[datetime.datetime] = Field(None, description="Data de validade")
    ncm_produto: Optional[str] = Field("", max_length=10, description="NCM do produto")
    gtin_produto: Optional[str] = Field(
        "", max_length=14, description="GTIN do produto"
    )
    mpn_produto: Optional[str] = Field("", max_length=30, description="MPN do produto")
    id_produto_erp: Optional[str] = Field(
        ..., description="ID do produto no ERP de origem"
    )
    descricao: Optional[str] = Field("", max_length=500, description="Descrição")
    preco: Optional[float] = Field(..., description="Preço")
    preco_promocional: Optional[float] = Field(..., description="Preço promocional")
    # imagem: Optional[UploadFile] = Field(..., description="Imagem")
    codigo_produto: Optional[str] = Field(
        ..., max_length=30, description="Código do produto"
    )

    @validator("data_validade")
    def data_validar(cls, data):
        return data.replace(tzinfo=None)

class ProdutoOutput(ProdutoBase):
    id: uuid.UUID
    mercado_id: uuid.UUID
    promocao_id: uuid.UUID
    nome_mercado: str

    class Config:
        from_attributes = True

class ProdutoSimplesOutput(ProdutoBase):
    id: uuid.UUID
    mercado_id: uuid.UUID

    class Config:
        from_attributes = True


class ProdutoPromocaoOutput(ProdutoOutput):
    mercado: Any
