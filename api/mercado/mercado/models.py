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
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from core.database import Base
from mercado.mercado.schemas import (
    MercadoCreate,
    MercadoUpdate,
    ProdutoBase,
    ProdutoPromocaoErp,
)
from usuario.usuario.models import Usuario

from sqlalchemy.dialects.postgresql import JSONB
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType
from enum import Enum, IntEnum
from core.redis import redis
import sqlalchemy


class Mercado(Base):
    """Models responsável por registrar os dados do mercado"""

    __tablename__ = "mercado_mercado"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    usuario_id = mapped_column(UUID, ForeignKey("usuario_usuario.id"))
    usuario = relationship(Usuario, backref=backref("mercado", uselist=False))
    cnpj: Mapped[str] = mapped_column(String(14), nullable=False, unique=True)
    razao_social: Mapped[str] = mapped_column(String(30), nullable=False)
    nome_fantasia: Mapped[str] = mapped_column(String(55), nullable=False)
    descricao: Mapped[str] = mapped_column(String(500), nullable=True)
    logo: Mapped[str] = mapped_column(String(255), nullable=True)
    telefone: Mapped[int] = mapped_column(BigInteger, nullable=False)
    cep: Mapped[str] = mapped_column(String(8), nullable=False)
    estado: Mapped[str] = mapped_column(String(255), nullable=False)
    cidade: Mapped[str] = mapped_column(String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(String(255), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=False)
    numero_endereco: Mapped[int] = mapped_column(Integer, nullable=False)
    complemento: Mapped[str] = mapped_column(String(255), nullable=True)
    nome_responsavel: Mapped[str] = mapped_column(String(255), nullable=False)
    cpf_responsavel: Mapped[str] = mapped_column(String(11), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)
    mercado_valido: Mapped[bool] = mapped_column(Boolean, default=False)


class MercadoManager:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_mercado(self, data: MercadoCreate):
        _mercado = Mercado(
            cnpj=data.cnpj,
            usuario_id=data.usuario.id,
            razao_social=data.razao_social,
            nome_fantasia=data.nome_fantasia,
            telefone=data.telefone,
            descricao=data.descricao,
            cep=data.cep,
            estado=data.estado,
            cidade=data.cidade,
            bairro=data.bairro,
            endereco=data.endereco,
            numero_endereco=data.numero_endereco,
            nome_responsavel=data.nome_responsavel,
            cpf_responsavel=data.cpf_responsavel,
        )

        self.db.add(_mercado)
        await self.db.commit()

        return _mercado

    async def get_mercado_by_cnpj(self, cnpj: str):
        _query = select(Mercado).where(Mercado.cnpj == cnpj)
        _mercado = await self.db.execute(_query)
        _mercado = _mercado.scalar()

        return _mercado

    async def get_mercado_by_usuario(self, id_usuario: str):
        _query = select(Mercado).where(Mercado.usuario_id == id_usuario)
        _mercado = await self.db.execute(_query)
        _mercado = _mercado.scalar()

        return _mercado

    async def get_mercados_by_nome(self, nome: str):
        _query = select(Mercado).filter(Mercado.nome_fantasia.like(f"{nome}%"))
        _mercados = await self.db.execute(_query)
        _mercados = _mercados.scalars().all()

        return _mercados

    async def get_mercado_id(self, id_usuario: str):
        _query = select(Mercado.id).filter(Mercado.usuario_id == id_usuario)
        _mercado_id = await self.db.execute(_query)
        _mercado_id = _mercado_id.scalar()

        return _mercado_id

    async def get_cnpj_by_usuario(self, id_usuario: str):
        _query = select(Mercado.cnpj).filter(Mercado.usuario_id == id_usuario)
        _cnpj = await self.db.execute(_query)
        _cnpj = _cnpj.scalar()

        return _cnpj

    async def get_mercados(self):
        _query = select(Mercado).filter(Mercado.deleted == False)
        _mercados = await self.db.execute(_query)
        _mercados = _mercados.scalars().all()

        return _mercados

    async def update_mercado(self, id_usuario: str, mercado: MercadoUpdate):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    nome_fantasia=mercado.nome_fantasia,
                    telefone=mercado.telefone,
                    descricao=mercado.descricao,
                    cep=mercado.cep,
                    estado=mercado.estado,
                    cidade=mercado.cidade,
                    bairro=mercado.bairro,
                    endereco=mercado.endereco,
                    numero_endereco=mercado.numero_endereco,
                    complemento=mercado.complemento,
                    updated_at=datetime.datetime.now(),
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar dados do mercado: {err}",
            )

    async def delete_mercado_by_usuario(self, id_usuario):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    deleted=True,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar mercado: {err}",
            )

    async def restore_mercado_by_usuario(self, id_usuario):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    deleted=False,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao restaurar mercado: {err}",
            )


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


class Promocao(Base):
    """Models responsável por registrar as promoções de produtos no mercado"""

    __tablename__ = "mercado_promocao"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
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
 
 
class TipoEmpresaERP(IntEnum):
    """Enum responsável por registrar as empresas de ERP disponíveis para conexão"""

    MAXDATA = 1


class ApiMercados(Base):
    """Models responsável por registrar os dados de conexão da API do ERP"""
    
    __tablename__ = "api_mercados"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(
        Mercado, backref=backref("api_mercados", uselist=False)
    )
    url_base: Mapped[str] = mapped_column(String(255), nullable=True)
    porta: Mapped[int] = mapped_column(Integer, nullable=True)
    empresa_erp: Mapped[TipoEmpresaERP] = mapped_column(sqlalchemy.Enum(TipoEmpresaERP), nullable=True)
    terminal: Mapped[str] = mapped_column(String(255), nullable=True)
    emp_id: Mapped[int] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)