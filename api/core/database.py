from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings  
from typing import Annotated, Generator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

DB_ENGINE = settings.db_engine
DB_USER = settings.db_user
DB_PASSWORD = settings.db_password
DB_NAME = settings.db_name
DB_PORT = settings.db_port
DB_HOST = settings.db_host

ASYNC_DB_ENGINE = settings.async_db_engine
ASYNC_DB_USER = settings.async_db_user
ASYNC_DB_PASSWORD = settings.async_db_password
ASYNC_DB_NAME = settings.async_db_name
ASYNC_DB_PORT = settings.async_db_port
ASYNC_DB_HOST = settings.async_db_host

SQLALCHEMY_DATABASE_URI: str = (
    f"{DB_ENGINE}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
engine = create_engine(SQLALCHEMY_DATABASE_URI, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
ASYNC_SQLALCHEMY_DATABASE_URI: str = f"{ASYNC_DB_ENGINE}+asyncpg://{ASYNC_DB_USER}:{ASYNC_DB_PASSWORD}@{ASYNC_DB_HOST}:{ASYNC_DB_PORT}/{ASYNC_DB_NAME}"
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
