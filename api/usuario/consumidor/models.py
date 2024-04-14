from usuario.usuario.models import Usuario
from sqlalchemy import UUID, Boolean, DateTime, ForeignKey, String, select, Integer
from sqlalchemy.orm import mapped_column, Mapped
import uuid

class Consumidor(Usuario):
    __tablename__ = "usuario_consumidor"
    __mapper_args__ = {
        "inherit_condition": (id == Usuario.id),
    }
    id = mapped_column(UUID, ForeignKey('usuario_usuario.id'), primary_key=True)
    cep: Mapped[str] = mapped_column(String(8), nullable=False)
    estado: Mapped[str] = mapped_column(String(255), nullable=False)
    cidade: Mapped[str] = mapped_column(String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(String(255), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=False)
    numero_endereco: Mapped[int] = mapped_column(Integer, nullable=False)
    complemento: Mapped[str] = mapped_column(String(255), nullable=True)
    telefone: Mapped[int] = mapped_column(Integer, nullable=False)
    