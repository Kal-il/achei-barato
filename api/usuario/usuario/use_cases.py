from sqlalchemy.ext.asyncio import AsyncSession
from core.security import verify_password

from api.usuario.usuario.models import Usuario, UsuarioManager
from api.usuario.usuario.schemas import UsuarioAuth


class UsuarioUseCase:
    @staticmethod
    async def authenticate(db: AsyncSession, email: str, password: str) -> Usuario | None:
        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.get_usuario_by_email(email)

        if not _usuario:
            return None
        
        # Verifica se a senha confere
        if not verify_password(password, _usuario.hashed_password): 
            return None

        return _usuario

    @staticmethod
    async def create_usuario(db: AsyncSession, data: UsuarioAuth) -> Usuario | None:
        usuario_manager = UsuarioManager(db=db)
        _usuario = usuario_manager.create_usuario(data)

        return _usuario
