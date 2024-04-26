import uuid
from core.database import Base
from usuario.usuario.schemas import UsuarioAuth
from sqlalchemy import UUID, ForeignKey, String, Integer, select
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.orm import relationship
from usuario.usuario.models import Usuario


class UsuarioAuthGoogle(Base):
    __tablename__ = "usuario_auth_google"
    
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    id_google: Mapped[str] = mapped_column(String(255), nullable=False)
    id_usuario: Mapped[str] = mapped_column(UUID, ForeignKey('usuario_usuario.id'))


class UsuarioAuthGoogleManager:
    def __init__(self, db):
        self.db = db

    async def get_usuario_auth_google_by_id_google(self, id_google: str) -> UsuarioAuthGoogle:
        select_query = select(UsuarioAuthGoogle).where(UsuarioAuthGoogle.id_google == id_google)    
        usuario_auth_google = await self.db.execute(select_query)
        _info_usuario_google = usuario_auth_google.scalar()
        
        if _info_usuario_google:
            select_usuario = select(Usuario).where(Usuario.id == _info_usuario_google.id_usuario)   
            usuario = await self.db.execute(select_usuario)
            usuario = usuario.scalar()
            return usuario
        
        return None
    
    async def create_usuario_auth_google(self, data: dict) -> UsuarioAuthGoogle:
        if usuario_auth_google := await self.get_usuario_auth_google_by_id_google(data['id_google']):
            return usuario_auth_google
        
        usuario_auth_google = UsuarioAuthGoogle(**data)
        self.db.add(usuario_auth_google)
        await self.db.commit()
        return usuario_auth_google
    
    