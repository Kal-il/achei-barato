from datetime import timedelta
import stat
from typing import Optional
from weakref import ref
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from api.core.config import settings
from api.core.security import create_access_token, create_refresh_token, verify_password
from jose import jwt
from api.usuario.usuario.models import Usuario, UsuarioManager
from api.usuario.usuario.schemas import TokenPayload, UsuarioAuth, TokenSchema


class UsuarioUseCase:

    @staticmethod
    async def authenticate(
        db: AsyncSession, email: str, password: str
    ) -> Optional[Usuario]:
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
        access_token = create_access_token(subject=_usuario.email)
        refresh_token = create_refresh_token(subject=_usuario.email)

        return TokenSchema(access_token=access_token, refresh_token=refresh_token)

    @staticmethod
    async def refresh_access_token(db: AsyncSession, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, settings.secret_key, settings.algorithm)
            token_data = TokenPayload(**payload)
        except Exception as err:
            print(err)

        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.get_usuario_by_email(token_data.sub)

        if not _usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Erro durante autenticação: usuário não encontrado.",
            )

        access_token = create_access_token(_usuario.email)
        refresh_token = create_refresh_token(_usuario.email)

        return TokenSchema(access_token=access_token, refresh_token=refresh_token)

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
