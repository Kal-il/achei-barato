import datetime
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from pydantic import EmailStr
from usuario.usuario.models import Usuario
from sqlalchemy import UUID, BigInteger, ForeignKey, String, Integer, exists, select, update
from sqlalchemy.orm import mapped_column, Mapped
from core.security import get_hashed_password
import uuid


class Consumidor(Usuario):
    __tablename__ = "usuario_consumidor"
    # id: Mapped[str] = mapped_column(
    #     UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    # )
    id: Mapped[str] = mapped_column(UUID, ForeignKey("usuario_usuario.id"), primary_key=True)
    cep: Mapped[str] = mapped_column(String(8), nullable=False)
    estado: Mapped[str] = mapped_column(String(255), nullable=False)
    cidade: Mapped[str] = mapped_column(String(255), nullable=False)
    bairro: Mapped[str] = mapped_column(String(255), nullable=False)
    endereco: Mapped[str] = mapped_column(String(255), nullable=False)
    numero_endereco: Mapped[int] = mapped_column(Integer, nullable=False)
    complemento: Mapped[str] = mapped_column(String(255), nullable=True)
    telefone: Mapped[int] = mapped_column(BigInteger, nullable=False)

    __mapper_args__ = {
        "inherit_condition": (id == Usuario.id),
    }


class ConsumidorManager:
    def __init__(self, db):
        self.db = db

    async def create_consumidor(self, data):
        
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
            telefone=data.telefone,
        )

        self.db.add(_consumidor)
        await self.db.commit()
        return _consumidor

    async def get_consumidor_by_email(self, email: str):
        try:
            _query = select(Consumidor).where(Consumidor.email == email, Consumidor.deleted == False)
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

    async def check_consumidor_exists(self, id: UUID):
        try:
            _query = select(Consumidor).where(Consumidor.id == id, Consumidor.deleted == False)
            _exists = await self.db.execute(_query)
            _exists = _exists.scalar()
            return _exists
        except Exception as e:
            print(e)
            return None       

    async def update_consumidor(self, consumidor_data: dict):
        # Verifica se os dados do usuário foram atualizados.
        if consumidor_data.get('nome') or consumidor_data.get('email'):

            # Organiza o dicionário que será utilizado para atualizar os campos
            usuario_data = {}
            if nome := consumidor_data.pop('nome', ""):
                if nome:
                    usuario_data['nome'] = nome
            if email := consumidor_data.pop('email', ""):
                if email:
                    usuario_data['email'] = email

            try:
                _query = update(Usuario).where(
                    Usuario.id == consumidor_data.get('id')
                ).values(
                    **usuario_data,
                    updated_at=datetime.datetime.now()
                )
                await self.db.execute(_query)
                await self.db.commit()
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Ocorreu um erro ao atualizar dados do usuário do consumidor: {e}"
                )

        # Atualiza os dados do consumidor
        try:
            _query = update(Consumidor).where(
                Consumidor.id == consumidor_data.get('id')
            ).values(
                **consumidor_data
            )
            await self.db.execute(_query)
            await self.db.commit()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ocorreu um erro ao atualizar dados do consumidor: {e}"
            )
    
    async def delete_consumidor(self, id_consumidor: UUID):
        try:
            _query = update(Usuario).where(
                Usuario.id == id_consumidor
                ).values(
                    deleted=True
                )
            await self.db.execute(_query)
            await self.db.commit()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ocorreu um erro ao atualizar dados do consumidor: {e}"
            )

    async def check_deleted_consumidor_exists(self, email: EmailStr):
        try:
            _query = select(Usuario).where(
                    Usuario.email == email,
                    Usuario.deleted == True
                )
            _exists = self.db.execute(_query)
            breakpoint()
            return _exists
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ocorreu um erro ao atualizar dados do consumidor: {e}"
            )
    
    async def restore_consumidor_by_email(self, email: EmailStr):
        try:
            _query = update(Usuario).where(
                Usuario.email == email,
                Usuario.deleted == True,
            ).values(deleted=False)
            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise err