from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings
from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

DB_ENGINE_MERCADO = settings.db_engine_mercado
DB_USER_MERCADO = settings.db_user_mercado
DB_PASSWORD_MERCADO = settings.db_password_mercado
DB_NAME_MERCADO = settings.db_name_mercado
DB_PORT_MERCADO = settings.db_port_mercado
DB_HOST_MERCADO = settings.db_host_mercado

ASYNC_DB_ENGINE_MERCADO = settings.async_db_engine_mercado
ASYNC_DB_USER_MERCADO = settings.async_db_user_mercado
ASYNC_DB_PASSWORD_MERCADO = settings.async_db_password_mercado
ASYNC_DB_NAME_MERCADO = settings.async_db_name_mercado
ASYNC_DB_PORT_MERCADO = settings.async_db_port_mercado
ASYNC_DB_HOST_MERCADO = settings.async_db_host_mercado

SQLALCHEMY_DATABASE_URI: str = (
    f"{DB_ENGINE_MERCADO}://{DB_USER_MERCADO}:{DB_PASSWORD_MERCADO}@{DB_HOST_MERCADO}:{DB_PORT_MERCADO}/{DB_NAME_MERCADO}"
)
engine = create_engine(SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


ASYNC_SQLALCHEMY_DATABASE_URI: str = (
    f"{ASYNC_DB_ENGINE_MERCADO}+asyncpg://{ASYNC_DB_USER_MERCADO}:{ASYNC_DB_PASSWORD_MERCADO}@{ASYNC_DB_HOST_MERCADO}:{ASYNC_DB_PORT_MERCADO}/{ASYNC_DB_NAME_MERCADO}"
)
async_engine = create_async_engine(ASYNC_SQLALCHEMY_DATABASE_URI)
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_async_db() -> Generator:
    async with AsyncSessionLocal() as db:
        yield db


ActiveAsyncSession = Depends(get_async_db)
AsyncDBDependency = Annotated[AsyncSession, ActiveAsyncSession]

Base = declarative_base()
