import datetime
from typing import Any
import uuid

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    UUID,
    select,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from core.database import Base
from mercado.mercado.schemas import MercadoCreate
from usuario.usuario.models import Usuario

from sqlalchemy.dialects.postgresql import JSONB
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType

class Mercado(Base):
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
        try:
            _query = select(Mercado).where(Mercado.cnpj == cnpj)
            _mercado = await self.db.execute(_query)
            _mercado = _mercado.scalar()

            return _mercado
        except:
            return None

storage = FileSystemStorage(path="./media")

class Produto(Base):
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
