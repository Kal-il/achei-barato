from datetime import datetime, timedelta
from typing import Any, Union
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt, JWTError
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException, status
from api.core.config import settings
from api.usuario.usuario.schemas import TokenData
from api.usuario.usuario.models import UsuarioManager, Usuario

password_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/usuario/usuario/login")

def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)


def create_access_token(
    subject: Union[str, Any], expires_delta: Union[timedelta, None] = None
) -> str:
    # Cria token de acesso JWT
    if expires_delta:
        exp = datetime.now() + expires_delta
    else:
        exp = datetime.now() + timedelta(hours=settings.access_token_expire_hours)

    jwt_data = {
        "exp": exp,
        "sub": str(subject),
    }

    jwt_encoded = jwt.encode(
        jwt_data, settings.secret_key, settings.algorithm
    )

    return jwt_encoded


def create_refresh_token(
    subject: Union[str, Any], expires_delta: Union[timedelta, None] = None
) -> str:
    # Cria refresh token com o método JWT
    if expires_delta:
        exp = datetime.now() + expires_delta
    else:
        exp = datetime.now() + timedelta(hours=settings.refresh_token_expire_hours)

    jwt_data = {
        "exp": exp,
        "sub": str(subject),
    }

    jwt_encoded = jwt.encode(
        jwt_data, settings.secret_key, settings.algorithm
    )

    return jwt_encoded

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        breakpoint()
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = UsuarioManager.get_usuario_by_email(token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[Usuario, Depends(get_current_user)],
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user