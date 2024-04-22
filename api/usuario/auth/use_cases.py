from typing import Optional

from fastapi import HTTPException, status
from jose import jwt
from jose.exceptions import ExpiredSignatureError
from sqlalchemy.ext.asyncio import AsyncSession

from usuario.usuario.models import Usuario, UsuarioManager
from core.security import verify_password
from core.config import settings
from core.security import create_access_token, create_refresh_token, verify_token_google
from usuario.auth.schemas import TokenSchema, TokenPayload, GoogleAuthSchema
from usuario.usuario.schemas import UsuarioAuth


from usuario.auth.models import UsuarioAuthGoogle, UsuarioAuthGoogleManager

class AuthUseCase:
    @staticmethod
    async def authenticate(
        db: AsyncSession, email: str, password: str
    ) -> Optional[TokenSchema]:
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
    
    async def authenticate_google(db: AsyncSession, token: GoogleAuthSchema):
        try:
            data_user = verify_token_google(token.token_google)   
            
            if not data_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Erro durante a autenticação com Google.",
                )
                
            usuario_manager = UsuarioManager(db=db)
            _usuario = await usuario_manager.get_usuario_by_email(data_user.get("email"))
            
            if not _usuario:
                data_usuario = {
                    "email": data_user.get('email'),
                    "nome": data_user.get('nome'),
                    'password': 'google'
                }
                
                _usuario = await usuario_manager.create_usuario(UsuarioAuth(**data_usuario))
            
                if not _usuario:
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail="Erro durante a criação do usuário.",
                    )
                    
                data_usuario_google = {
                    "id_google": data_user.get('id'),
                    "id_usuario": _usuario.id,
                }
                data_auth_google = await UsuarioAuthGoogleManager(db=db).create_usuario_auth_google(
                data_usuario_google
                )
                if not data_auth_google:
                    raise HTTPException(
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                        detail="Erro durante a criação do registro de autenticação com Google.",
                    )  
            access_token = create_access_token(subject=_usuario.email)
            refresh_token = create_refresh_token(subject=_usuario.email)
            
            return TokenSchema(access_token=access_token, refresh_token=refresh_token, token_type="bearer")
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro durante a autenticação com Google: {e}",
            )
    
 
 
        