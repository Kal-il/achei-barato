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

from mercado.promocao.models import Promocao
from mercado.mercado.models import Mercado
from core.database import Base
from .schemas import ProdutoBase
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType
from core.redis import redis
from sqlalchemy.orm import selectinload

storage = FileSystemStorage(path="./media")


class Produto(Base):
    """Models responsável por registrar os produtos do mercado"""

    __tablename__ = "mercado_produto"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(Mercado, backref=backref("mercado", uselist=False))
    promocao_id = mapped_column(UUID, ForeignKey("mercado_promocao.id"))
    promocao = relationship(
        Promocao, backref=backref("promocao", uselist=False), lazy="selectin"
    )
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

    async def get_produtos_by_mercado(self, mercado_id: uuid.UUID):
        query = select(Produto).where(Produto.mercado_id == mercado_id)
        _produtos = await self.db.execute(query)
        return _produtos.scalars().all()

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

    async def get_produto_por_id_erp(self, id_produto_erp: str, id_mercado: str):
        _query = select(Produto).where(
            Produto.id_produto_erp == id_produto_erp, Produto.mercado_id == id_mercado
        )

        _produto = await self.db.execute(_query)
        _produto = _produto.scalar()

        return _produto

    async def get_produtos_promocao(self, promocao_id: uuid.UUID):
        _query = select(Produto).where(Produto.promocao_id == promocao_id)
        _produtos = await self.db.execute(_query)
        return _produtos.scalars().all()

    async def update_produto_promocao(
        self, promocao: Promocao, mercado_id: str, id_produtos: list[str] = None
    ):
        # Atualiza os produtos em promoção, atribuindo o ID da promoção e o valor promocional
        if not id_produtos:
            query = select(Produto.id_produto_erp).where(
                Produto.promocao_id == promocao.id
            )
            id_produtos = await self.db.execute(query)
            id_produtos = id_produtos.scalars().all()

        for produto_id in id_produtos:
            query = (
                update(Produto)
                .where(
                    Produto.id_produto_erp == produto_id,
                    Produto.mercado_id == mercado_id,
                )
                .values(
                    promocao_id=promocao.id,
                    mercado_id=mercado_id,
                    preco_promocional=round(
                        (
                            Produto.preco
                            - (Produto.preco * promocao.percentual_desconto)
                        ),
                        2,
                    ),
                )
            )
            await self.db.execute(query)
        await self.db.commit()

    async def update_produto_promocao(
        self, promocao: Promocao, mercado_id: str, id_produtos: list[uuid.UUID] = None
    ):
        # Atualiza os produtos em promoção, atribuindo o ID da promoção e o valor promocional
        if not id_produtos:
            query = select(Produto.id_produto_erp).where(
                Produto.promocao_id == promocao.id
            )
            id_produtos = await self.db.execute(query)
            id_produtos = id_produtos.scalars().all()

        for produto_id in id_produtos:
            query = (
                update(Produto)
                .where(Produto.id == produto_id)
                .values(
                    promocao_id=promocao.id,
                    mercado_id=mercado_id,
                    preco_promocional=round(
                        (
                            Produto.preco
                            - (Produto.preco * promocao.percentual_desconto)
                        ),
                        2,
                    ),
                )
            )
            await self.db.execute(query)
        await self.db.commit()

    async def get_produtos_or_mercado(self, nome: str):
        try:
            produto_query = (
                select(Produto)
                .options(selectinload(Produto.mercado))
                .where(Produto.nome.ilike(f"{nome}%"))
            )
            produto_result = await self.db.execute(produto_query)
            produtos = produto_result.scalars().all()

            mercado_query = select(Mercado).where(
                Mercado.nome_fantasia.ilike(f"{nome}%")
            )
            mercado_result = await self.db.execute(mercado_query)
            mercados = mercado_result.scalars().all()

            result = {"produtos": produtos, "mercados": mercados}

            return result
        except Exception as e:
            print(f"Erro ao buscar os produtos: {e}")
            return None

    async def get_todos_produtos(self) -> List[Produto]:
        query = select(Produto)
        produtos = await self.db.execute(query)
        return produtos.scalars().all()

    async def get_produto_by_uuid(self, produto_id: uuid.UUID) -> Produto:
        query = select(Produto).where(Produto.id == produto_id)
        produto = await self.db.execute(query)
        return produto.scalar()
