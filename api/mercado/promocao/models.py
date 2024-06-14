import datetime
from typing import Any, List
import uuid

from fastapi import HTTPException, status
from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    String,
    UUID,
    select,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from mercado.mercado.models import Mercado
from mercado.promocao.schemas import ProdutoPromocaoErp, PromocaoBase
from core.database import Base

from sqlalchemy.dialects.postgresql import JSONB


class Promocao(Base):
    """Models responsável por registrar as promoções de produtos no mercado"""

    __tablename__ = "mercado_promocao"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(Mercado, backref=backref("promocao", uselist=False))
    produto: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False)
    data_inicial: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    data_final: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    percentual_desconto: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)


class PromocaoManager:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def save_promocao(self, promocao: PromocaoBase, mercado):
        try:
            promocao = Promocao(**promocao.__dict__, mercado=mercado)

            self.db.add(promocao)
            await self.db.commit()
        except Exception as e:
            print(e)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    async def get_promocoes(self, mercado_id: uuid.UUID):
        try:
            query = select(Promocao).where(Promocao.mercado_id == mercado_id)

            promocoes = await self.db.execute(query)
            return promocoes.scalars().all()
        except Exception as e:
            raise e


class ProdutosPromocaoErp(Base):
    """Models responsável por registrar os produtos em promoção no ERP"""

    __tablename__ = "mercado_produto_promocao_erp"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(
        Mercado, backref=backref("produtospromocaoerp", uselist=False)
    )
    nome = mapped_column(String(255), nullable=True)
    preco = mapped_column(Float, nullable=True)
    preco_promocional = mapped_column(Float, nullable=True)
    codigo_produto = mapped_column(String(30), nullable=True)
    ncm_produto = mapped_column(String(10), nullable=True)
    id_produto_erp = mapped_column(String(), nullable=True)
    marca = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)


class ProdutosPromocaoErpManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_produtos_erp(
        self, produtos: List[ProdutoPromocaoErp], mercado: Mercado
    ):
        for produto in produtos:

            _produto = ProdutosPromocaoErp(
                mercado_id=mercado.id,
                nome=produto.nome,
                marca=produto.marca,
                ncm_produto=produto.ncm_produto,
                id_produto_erp=produto.id_produto_erp,
                preco=produto.preco,
                preco_promocional=produto.preco_promocional,
                codigo_produto=produto.codigo_produto,
            )

            self.db.add(_produto)
            await self.db.commit()

        return produtos
