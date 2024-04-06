from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    # FastAPI
    app_name: str = "FastAPI"
    api_str: str = "/api/v1"

    # Banco de dados
    db_engine: str
    db_host: str
    db_port: int
    db_name: str
    db_user: str
    db_password: str

    # Banco de dados async
    async_db_engine: str
    async_db_host: str
    async_db_port: int
    async_db_name: str
    async_db_user: str
    async_db_password: str

    model_config = ConfigDict(env_file=".env")

settings = Settings()
