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

    # Configurações do processo de autenticação
    access_token_expire_hours: int = 24
    refresh_token_expire_hours: int = 3 * 24
    secret_key: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    algorithm: str = "HS256"

    google_client_id: str

    redis_cache_url: str

    # Configurações do ERP

    url_erp: str
    terminal: str
    emp_id: str



    model_config = ConfigDict(env_file=".env")

settings = Settings()
