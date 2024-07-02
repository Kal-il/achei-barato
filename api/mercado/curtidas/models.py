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
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from mercado.produto.models import Produto
from core.database import Base
from usuario.usuario.models import Usuario


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


class CurtidasManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_curtida(self, produto: Produto, usuario: Usuario):
        try:
            _curtida = Curtidas(
                produto_id=produto.id,
                usuario_id=usuario.id,
            )
            self.db.add(_curtida)
            await self.db.commit()

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar curtida: {err}",
            )

    async def get_curtidas(self, usuario: Usuario):
        try:
            _query = select(Curtidas).where(Curtidas.usuario_id == usuario.id)
            _curtida = await self.db.execute(_query)
            _curtida = _curtida.scalars().all()

            return _curtida



        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar curtida: {err}",
            )

    async def get_curtida(self, usuario: Usuario, id_produto: uuid.UUID):
        query = select(Curtidas).where(Curtidas.produto_id == id_produto, Curtidas.usuario_id == usuario.id)
        curtida = await self.db.execute(query)
        return curtida.scalar()

    async def delete_curtidas(self, produto: Produto, usuario: Usuario):
        try:
            _query = delete(Curtidas).where(
                Curtidas.produto_id == produto.id, Curtidas.usuario_id == usuario.id
            )
            await self.db.execute(_query)
            await self.db.commit()

            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar curtida: {err}",
            )
