import datetime
from pydantic import Field
from pydantic import BaseModel


class PostagemPromocaoBase(BaseModel):
    titulo: str = Field(..., max_length=50, description="Título")
    legenda: str = Field(..., max_length=255, description="Legenda")
    produto: str | None = Field(..., max_length=50, description="Nome do produto")
    preco: float | None = Field(description="Preço do produto em promoção")


class PostagemPromocaoOutput(PostagemPromocaoBase):
    autor: str
    imagem: bytes
    created_at: datetime.datetime
    


class PostagemPromocaoCreate(PostagemPromocaoBase):
    pass
