import datetime
from typing import List, Optional
import uuid
from pydantic import BaseModel, Field, validator

from mercado.produto.schemas import ProdutoBase


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
    data_inicial: datetime.datetime = Field(
        ..., description="Data de início da promoção"
    )
    data_final: datetime.datetime = Field(
        ..., description="Data de encerramento da promoção"
    )
    percentual_desconto: float = Field(
        ..., description="Percentual de desconto aplicado nos produtos"
    )
    descricao: Optional[str] = Field(..., description="Descrição da promoção")

    @validator("data_inicial", "data_final")
    def data_validar(cls, data):
        return data.replace(tzinfo=None)

    class Config:
        from_attributes = True


class PromocaoSchema(PromocaoBase):
    id: uuid.UUID = Field(..., description="ID da promoção")


class PromocaoUpdate(PromocaoBase):
    data_inicial: Optional[datetime.datetime] = Field(
        None, description="Data de início da promoção"
    )
    data_final: Optional[datetime.datetime] = Field(
        None, description="Data de encerramento da promoção"
    )
    percentual_desconto: Optional[float] = Field(
        0.0, description="Percentual de desconto aplicado nos produtos"
    )
    descricao: Optional[str] = Field("", description="Descrição da promoção")

    @validator("data_inicial", "data_final")
    def data_validar(cls, data):
        return data.replace(tzinfo=None)

    class Config:
        from_attributes = True


class PromocaoComProdutos(PromocaoSchema):
    produtos: List[ProdutoBase]


class PromocaoCreate(PromocaoBase):
    produtos: list[str] = Field(..., description="Produtos em promoção")


class PromocaoCreateManual(PromocaoBase):
    produtos: list[uuid.UUID] = Field(..., description="Produtos em promoção")
