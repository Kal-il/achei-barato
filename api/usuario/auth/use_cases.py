from typing import Optional

from fastapi import HTTPException, status
from jose import jwt
from jose.exceptions import ExpiredSignatureError
from sqlalchemy.ext.asyncio import AsyncSession

from api.usuario.usuario.models import Usuario, UsuarioManager
from api.core.security import verify_password
from api.core.config import settings
from api.core.security import create_access_token, create_refresh_token
from api.usuario.auth.schemas import TokenSchema, TokenPayload


class AuthUseCase:
    @staticmethod
    async def authenticate(
        db: AsyncSession, email: str, password: str
    ) -> Optional[Usuario]:
        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.get_usuario_by_email(email)

        if not _usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Usuário não encontrado",
            )

        # Verifica se a senha confere
        if not verify_password(password, _usuario.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token = create_access_token(subject=_usuario.email)
        refresh_token = create_refresh_token(subject=_usuario.email)

        return TokenSchema(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

    @staticmethod
    async def refresh_access_token(db: AsyncSession, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, settings.secret_key, settings.algorithm)
            token_data = TokenPayload(**payload)
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Não foi possível atualizar token de acesso: token expirado.",
            )

        usuario_manager = UsuarioManager(db=db)
        _usuario = await usuario_manager.get_usuario_by_email(token_data.sub)

        if not _usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Erro durante autenticação: Usuário não encontrado.",
            )

        access_token = create_access_token(_usuario.email)
        refresh_token = create_refresh_token(_usuario.email)

        return TokenSchema(access_token=access_token, refresh_token=refresh_token, token_type="bearer")
