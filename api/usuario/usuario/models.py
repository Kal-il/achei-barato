from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import Base
from sqlalchemy import UUID, Boolean, DateTime, Index, String, UniqueConstraint, select, update
from sqlalchemy.orm import mapped_column, Mapped
import uuid
import datetime


from usuario.usuario.schemas import UsuarioAuth, UsuarioBase


class Usuario(Base):
    __tablename__ = "usuario_usuario"

    id = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    nome: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[str] = mapped_column(Boolean, default=True)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    dono_mercado: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)   

    __table_args__ = (
        Index('_email_deleted_unique', email, deleted, 
              unique=True, 
              postgresql_where=(~deleted)
        ),
    )


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
            _query = select(Usuario).where(Usuario.email == email, Usuario.deleted == False)
            _usuario = await self.db.execute(_query)
            _usuario = _usuario.scalar()

            return _usuario
        except Exception as e:
            return None
        
    async def get_usuario_by_id(self, id: uuid.UUID) -> Optional[Usuario]:  
        try:
            _query = select(Usuario).where(Usuario.id == id)
            _usuario = await self.db.execute(_query)
            _usuario = _usuario.scalar()

            return _usuario
        except Exception as e:
            return None

    async def set_dono_mercado(self, usuario: UsuarioBase):
        try:
            _query = update(Usuario).where(Usuario.id == usuario.id).values(dono_mercado=True)
            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail=f"Erro ao definir atributo 'dono_mercado' em usuário: {err}"
            )
            
