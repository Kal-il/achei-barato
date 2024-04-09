from datetime import timedelta
from typing import Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from api.core.config import settings
from api.core.security import create_access_token, verify_password

from api.usuario.usuario.models import Usuario, UsuarioManager
from api.usuario.usuario.schemas import UsuarioAuth


class UsuarioUseCase:
    @staticmethod
    async def authenticate(db: AsyncSession, email: str, password: str) -> Optional[Usuario]:
        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.get_usuario_by_email(email)

        if not _usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado") 
        
        # Verifica se a senha confere
        if not verify_password(password, _usuario.hashed_password): 
            raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        access_token_expires = timedelta(minutes=settings.access_token_expire_hours)
        access_token = create_access_token(
            subject=_usuario.email, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    async def create_usuario(db: AsyncSession, data: UsuarioAuth) -> Optional[Usuario]:
        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.create_usuario(data)

        return _usuario
