from usuario.usuario.models import Usuario
from sqlalchemy import UUID, ForeignKey, String, Integer, select
from sqlalchemy.orm import mapped_column, Mapped
from core.security import get_hashed_password   


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
    

class ConsumidorManager:
    def __init__(self, db):
        self.db = db

    async def create_consumidor(self, data):
        breakpoint()
        _consumidor = Consumidor(
            nome=data.nome,
            email=data.email,
            hashed_password=get_hashed_password(data.password),
            cep=data.cep,
            estado=data.estado,
            cidade=data.cidade,
            bairro=data.bairro,
            endereco=data.endereco,
            complemento=data.complemento,
            numero_endereco=data.numero_endereco,
            telefone=data.telefone
        )

        self.db.add(_consumidor)
        await self.db.commit()
        return _consumidor

    async def get_consumidor_by_email(self, email: str):
        try:
            breakpoint()
            _query = select(Usuario).where(Usuario.email == email)
            _consumidor = await self.db.execute(_query)
            _consumidor = _consumidor.scalar()

            return _consumidor
        except Exception as e:
            return None