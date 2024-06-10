import datetime
from typing import Any, List
import uuid

from fastapi import HTTPException, status
from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    UUID,
    delete,
    select,
    update,
    func,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from mercado.mercado.models import Mercado
from core.database import Base
from .schemas import ProdutoBase
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType
from core.redis import redis

storage = FileSystemStorage(path="./media")


class Produto(Base):
    """Models responsável por registrar os produtos do mercado"""

    __tablename__ = "mercado_produto"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(Mercado, backref=backref("mercado", uselist=False))
    nome: Mapped[str] = mapped_column(String(255), nullable=True)
    marca: Mapped[str] = mapped_column(String(255), nullable=True)
    data_validade: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)
    ncm_produto: Mapped[str] = mapped_column(String(10), nullable=True)
    gtin_produto: Mapped[str] = mapped_column(String(14), nullable=True)
    mpn_produto: Mapped[str] = mapped_column(String(30), nullable=True)
    id_produto_erp: Mapped[str] = mapped_column(String(), nullable=True)
    descricao: Mapped[str] = mapped_column(String(500), nullable=True)
    preco: Mapped[float] = mapped_column(Float, nullable=True)
    preco_promocional: Mapped[float] = mapped_column(Float, nullable=True)
    imagem: Mapped[ImageType] = mapped_column(ImageType(storage=storage), nullable=True)
    codigo_produto: Mapped[str] = mapped_column(String(30), nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=True)


class ProdutoManager:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def clean_redis(self, id_mercado):
        await redis.flush()

    async def get_produto_by_id(self, cnpj: str, id_produto: str):
        _produto = await redis.get_produto(cnpj=cnpj, id_produto=id_produto)

        return _produto

    async def get_produtos_by_cnpj(self, cnpj: str):
        _produtos = await redis.get_produtos(cnpj)
        return _produtos

    async def sync_produtos(self, cnpj: str, produtos: List[ProdutoBase]):
        await redis.store_produtos_hash(cnpj=cnpj, produtos=produtos)

    async def save_produto(self, produto: ProdutoBase, mercado: Mercado):
        try:
            _produto = Produto(
                mercado_id=mercado.id,
                nome=produto.nome,
                marca=produto.marca,
                data_validade=produto.data_validade,
                ncm_produto=produto.ncm_produto,
                gtin_produto=produto.gtin_produto,
                mpn_produto=produto.mpn_produto,
                id_produto_erp=produto.id_produto_erp,
                descricao=produto.descricao,
                preco=produto.preco,
                preco_promocional=produto.preco_promocional,
                codigo_produto=produto.codigo_produto,
            )

            self.db.add(_produto)
            await self.db.commit()

            return _produto
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar produto: {err}",
            )

    async def get_produto_id(self, id_produto: str):
        _query = select(Produto).where(Produto.id == id_produto)
        _produto = await self.db.execute(_query)
        _produto = _produto.scalar()

        return _produto
