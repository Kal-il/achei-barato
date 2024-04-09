from datetime import datetime, timedelta
from typing import Any, Union
from typing_extensions import deprecated
from passlib.context import CryptContext
from jose import jwt

from api.core.config import settings

password_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])


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
        jwt_data, settings.jwt_access_secret_key, settings.algorithm
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
        jwt_data, settings.jwt_refresh_secret_key, settings.algorithm
    )

    return jwt_encoded
