import datetime
import uuid

from fastapi import HTTPException, status
from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    UUID,
    delete,
    select,
    func,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from mercado.mercado.models import Mercado
from mercado.mercado import schemas
from core.database import Base
from usuario.usuario.models import Usuario

from sqlalchemy.orm import selectinload


class SeguirMercado(Base):
    __tablename__ = "mercado_seguir"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(
        Mercado, backref=backref("mercado_seguir", uselist=False, lazy="selectin")
    )
    usuario_id = mapped_column(UUID, ForeignKey("usuario_usuario.id"))
    usuario = relationship(Usuario, backref=backref("mercado_seguir", uselist=False))
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)


class SeguirMercadoManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def seguir_mercado(self, mercado: Mercado, usuario: Usuario):
        try:
            _seguir = SeguirMercado(
                mercado_id=mercado.id,
                usuario_id=usuario.id,
            )
            self.db.add(_seguir)
            await self.db.commit()
            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar seguir: {err}",
            )

    async def delete_seguir(self, mercado: Mercado, usuario: Usuario):
        try:
            _query = delete(SeguirMercado).where(
                SeguirMercado.mercado_id == mercado.id,
                SeguirMercado.usuario_id == usuario.id,
            )
            await self.db.execute(_query)
            await self.db.commit()

            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar seguir: {err}",
            )

    async def get_mercados_seguir(self, usuario: Usuario):
        try:
            _query = (
                select(SeguirMercado)
                .where(SeguirMercado.usuario_id == usuario.id)
                .options(selectinload(SeguirMercado.mercado))
            )
            result = await self.db.execute(_query)
            _seguir = result.scalars().all()

            mercados = [seguir.mercado for seguir in _seguir]
            return mercados

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar seguir: {err}",
            )

    async def get_mercado_numero_seguidos(self, usuario: Usuario):
        try:
            _query = (
                select(func.count())
                .select_from(SeguirMercado)
                .where(SeguirMercado.usuario_id == usuario.id)
            )
            _numero_seguidos = await self.db.execute(_query)
            _numero_seguidos = _numero_seguidos.scalar()

            return _numero_seguidos

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar número de seguidos: {err}",
            )

    async def get_mercado_numero_seguindo(self, mercado: Mercado):
        try:
            _query = (
                select(func.count())
                .select_from(SeguirMercado)
                .where(SeguirMercado.mercado_id == mercado.id)
            )
            _numero_seguindo = await self.db.execute(_query)
            _numero_seguindo = _numero_seguindo.scalar()

            return _numero_seguindo

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar número de seguindo: {err}",
            )
