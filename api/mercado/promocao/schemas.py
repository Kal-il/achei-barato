import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator


class ProdutoPromocaoErp(BaseModel):
    #  promocao de produtos de erp

    nome: Optional[str] = Field(..., max_length=255, description="Nome")
    preco: Optional[float] = Field(..., description="Preço")
    preco_promocional: Optional[float] = Field(..., description="Preço promocional")
    codigo_produto: Optional[str] = Field(
        ..., max_length=30, description="Código do produto"
    )
    ncm_produto: Optional[str] = Field(..., max_length=10, description="NCM do produto")
    id_produto_erp: Optional[str] = Field(
        ..., description="ID do produto no ERP de origem"
    )
    marca: Optional[str] = Field(..., max_length=255, description="Marca")

class PromocaoBase(BaseModel):
    data_inicial: datetime.datetime = Field(..., description="Data de início da promoção")
    data_final: datetime.datetime = Field(..., description="Data de encerramento da promoção")
    percentual_desconto: float = Field(..., description="Percentual de desconto aplicado nos produtos")
    produto: list[str]= Field(..., description="Produtos em promoção")

    @validator("data_inicial", "data_final")
    def data_validar(cls, data):
        return data.replace(tzinfo=None)

    class Config:
        from_attributes = True