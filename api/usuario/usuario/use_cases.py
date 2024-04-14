from typing import Optional
from fastapi import HTTPException, status
from jose.exceptions import ExpiredSignatureError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from api.core.config import settings
from api.core.security import create_access_token, create_refresh_token, verify_password
from jose import jwt
from api.usuario.usuario.models import Usuario, UsuarioManager
from api.usuario.usuario.schemas import TokenPayload, UsuarioAuth, TokenSchema


class UsuarioUseCase:
    @staticmethod
    async def create_usuario(db: AsyncSession, data: UsuarioAuth) -> Optional[Usuario]:
        usuario_manager = UsuarioManager(db=db)

        try:
            _usuario = await usuario_manager.create_usuario(data)
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este e-mail já está sendo usado",
            )

        return _usuario
