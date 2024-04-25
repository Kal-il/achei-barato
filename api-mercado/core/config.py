from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    # FastAPI
    app_name: str = "FastAPI"
    api_str: str = "/api/v1"

    # Banco de dados
    db_engine_mercado: str
    db_host_mercado: str
    db_port_mercado: int
    db_name_mercado: str
    db_user_mercado: str
    db_password_mercado: str

    # Banco de dados async
    async_db_engine_mercado: str
    async_db_host_mercado: str
    async_db_port_mercado: int
    async_db_name_mercado: str
    async_db_user_mercado: str
    async_db_password_mercado: str
    
    model_config = ConfigDict(env_file=".env")

settings = Settings()