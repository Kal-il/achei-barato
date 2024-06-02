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
from mercado.mercado.enums import TipoEmpresaERP
from core.redis import redis
import sqlalchemy
from sqlalchemy.orm import selectinload


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


class Curtidas(Base):
    """Models responsável por registrar as curtidas de produtos no mercado"""

    __tablename__ = "mercado_curtida"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    produto_id = mapped_column(UUID, ForeignKey("mercado_produto.id"))
    produto = relationship(Produto, backref=backref("mercado_curtida", uselist=False))
    usuario_id = mapped_column(UUID, ForeignKey("usuario_usuario.id"))
    usuario = relationship(Usuario, backref=backref("curtida", uselist=False))
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)

        
class SeguirMercado(Base):
    __tablename__ = "mercado_seguir"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(Mercado, backref=backref("mercado_seguir", uselist=False, lazy="selectin"))
    usuario_id = mapped_column(UUID, ForeignKey("usuario_usuario.id"))
    usuario = relationship(Usuario, backref=backref("mercado_seguir", uselist=False))
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)
