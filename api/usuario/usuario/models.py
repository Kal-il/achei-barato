from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import Base
from sqlalchemy import UUID, Boolean, DateTime, String, select
from sqlalchemy.orm import mapped_column, Mapped
import uuid
import datetime


from usuario.usuario.schemas import UsuarioAuth


class Usuario(Base):
    __tablename__ = "usuario_usuario"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    nome: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[str] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)   
    dono_mercado: Mapped[bool] = mapped_column(Boolean, default=False)


class UsuarioManager:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create_usuario(self, data: UsuarioAuth) -> Usuario:
        from core.security import get_hashed_password
        _usuario = Usuario(
            nome=data.nome,
            email=data.email,
            hashed_password=get_hashed_password(data.password),
        )

        self.db.add(_usuario)
        await self.db.commit()
        return _usuario

    async def get_usuario_by_email(self, email: str) -> Optional[Usuario]:
        try:
            _query = select(Usuario).where(Usuario.email == email)
            _usuario = await self.db.execute(_query)
            _usuario = _usuario.scalar()

            return _usuario
        except Exception as e:
            return None
