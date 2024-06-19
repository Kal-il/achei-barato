from core.database import Base
from sqlalchemy import UUID, Boolean, DateTime, Index, String, UniqueConstraint, select, update
import datetime
import uuid
import hashlib
import aiofiles
import base64
from fastapi import HTTPException, UploadFile, status
from pydantic import EmailStr
from usuario.usuario.models import Usuario
from sqlalchemy import UUID, BigInteger, ForeignKey, String, Integer, exists, select, update
from sqlalchemy.orm import mapped_column, Mapped
from core.security import get_hashed_password
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship


class PostagemPromocao(Base):
    __tablename__ = "usuario_postagem_promocao"

    id = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    usuario_id = mapped_column(UUID(as_uuid=True), ForeignKey("usuario_usuario.id"))
    usuario = relationship(Usuario, backref=backref("usuario_postagem_promocao", uselist=False))
    legenda: Mapped[str] = mapped_column(String(255), nullable=False)
    imagem: Mapped[str] = mapped_column(String(255), nullable=False)
    denuncia: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)   
   