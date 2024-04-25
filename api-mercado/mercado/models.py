from core.database import Base
from sqlalchemy import (
    UUID,
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    String,
    BigInteger,
    Integer,
)
from sqlalchemy.orm import mapped_column, Mapped
import uuid
import datetime
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType


storage_logo = FileSystemStorage(path="./media/logo")


class Mercado(Base):
    __tablename__ = "mercado_mercado"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    cnpj: Mapped[str] = mapped_column(String(14), nullable=False, unique=True)
    razao_social: Mapped[str] = mapped_column(String(30), nullable=False)
    nome_fantasia: Mapped[str] = mapped_column(String(55), nullable=False)
    descricao: Mapped[str] = mapped_column(String(500), nullable=True)
    logo: Mapped[ImageType] = mapped_column(
        ImageType(storage=storage_logo), nullable=True
    )
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


storage = FileSystemStorage(path="./media/produtos")


class Produto(Base):
    __tablename__ = "mercado_produto"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id: Mapped[str] = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    nome: Mapped[str] = mapped_column(String(255), nullable=True)
    marca: Mapped[str] = mapped_column(String(255), nullable=True)
    data_validade: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=True)
    ncm_produto: Mapped[str] = mapped_column(String(10), nullable=True)
    gtin_produto: Mapped[str] = mapped_column(String(14), nullable=True)
    mpn_produto: Mapped[str] = mapped_column(String(30), nullable=True)
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
