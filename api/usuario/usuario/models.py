from core.database import Base
from sqlalchemy import UUID, Boolean, DateTime, String, create_engine
from sqlalchemy.orm import mapped_column, Mapped
import uuid
import datetime

class Usuario(Base):
    __tablename__ = "usuario_usuario"
    
    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[String] = mapped_column(String(255), nullable=False, unique=True)  
    hashed_password: Mapped[String] = mapped_column(String(255), nullable=False)
    is_active: Mapped[String] = mapped_column(Boolean, default=True)   
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime, default=datetime.datetime.now())
    nome: Mapped[str] = mapped_column(String(255), nullable=False)
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)
    
    
    
    