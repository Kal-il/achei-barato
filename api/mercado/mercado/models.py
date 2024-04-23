import datetime
import uuid

from fastapi import HTTPException, status
from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UUID,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from core.database import Base
from mercado.mercado.schemas import MercadoCreate, MercadoUpdate
from usuario.usuario.models import Usuario


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

    async def update_mercado(self, id_usuario: str, mercado: MercadoUpdate):
        try:
            _query = update(Mercado).where(Mercado.usuario_id == id_usuario).values(
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
                )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar dados do mercado: {err}",
            )
