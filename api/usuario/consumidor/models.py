from usuario.usuario.models import Usuario
from sqlalchemy import UUID, ForeignKey, String, Integer, select
from sqlalchemy.orm import mapped_column, Mapped
from core.security import get_hashed_password
import uuid


class Consumidor(Usuario):
    __tablename__ = "usuario_consumidor"
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    id_usuario: Mapped[str] = mapped_column(UUID, ForeignKey("usuario_usuario.id"))
    cep: Mapped[str] = mapped_column(String(8), nullable=False)
    estado: Mapped[str] = mapped_column(String(255), nullable=False)
    cidade: Mapped[str] = mapped_column(String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(String(255), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=False)
    numero_endereco: Mapped[int] = mapped_column(Integer, nullable=False)
    complemento: Mapped[str] = mapped_column(String(255), nullable=True)
    telefone: Mapped[int] = mapped_column(Integer, nullable=False)

    __mapper_args__ = {
        "inherit_condition": (id_usuario == Usuario.id),
    }


class ConsumidorManager:
    def __init__(self, db):
        self.db = db

    async def create_consumidor(self, data):
        _consumidor = Consumidor(
            id=data.get("id"),
            cep=data.get("cep"),
            estado=data.get("estado"),
            cidade=data.get("cidade"),
            bairro=data.get("bairro"),
            endereco=data.get("endereco"),
            complemento=data.get("complemento"),
            numero_endereco=data.get("numero_endereco"),
            telefone=data.get("telefone"),
        )

        breakpoint()
        self.db.add(_consumidor)
        await self.db.commit()
        return _consumidor

    async def get_consumidor_by_email(self, email: str):
        try:
            _query = select(Consumidor).where(Consumidor.email == email)
            _consumidor = await self.db.execute(_query)
            _consumidor = _consumidor.scalar()

            return _consumidor
        except Exception as e:
            return None

    async def get_consumidor_by_id(self, id: UUID):
        try:
            _query = select(Consumidor).where(Consumidor.id == id)
            _consumidor = await self.db.execute(_query)
            _consumidor = _consumidor.scalar()
            return _consumidor
        except Exception as e:
            return None
