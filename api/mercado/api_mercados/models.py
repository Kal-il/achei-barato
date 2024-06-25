import datetime
import uuid

from fastapi import HTTPException, status
from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    UUID,
    delete,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import backref, relationship

from mercado.enums import TipoEmpresaERP
from mercado.mercado.models import Mercado
from core.database import Base

import sqlalchemy


class ApiMercados(Base):
    """Models responsável por registrar os dados de conexão da API do ERP"""

    __tablename__ = "api_mercados"

    id: Mapped[str] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    mercado_id = mapped_column(UUID, ForeignKey("mercado_mercado.id"))
    mercado = relationship(Mercado, backref=backref("api_mercados", uselist=False))
    url_base: Mapped[str] = mapped_column(String(255), nullable=True)
    porta: Mapped[int] = mapped_column(Integer, nullable=True)
    empresa_erp: Mapped[TipoEmpresaERP] = mapped_column(
        sqlalchemy.Enum(TipoEmpresaERP), nullable=True
    )
    terminal: Mapped[str] = mapped_column(String(255), nullable=True)
    emp_id: Mapped[int] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    updated_at: Mapped[datetime.datetime] = mapped_column(
        DateTime, default=datetime.datetime.now()
    )
    deleted: Mapped[bool] = mapped_column(Boolean, default=False)


class ApiMercadosManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_api_mercados(self, api_mercado: ApiMercados, mercado: Mercado):
        try:
            api_mercado_data = ApiMercados(
                mercado_id=mercado.id,
                url_base=api_mercado.url_base,
                porta=api_mercado.porta,
                empresa_erp=api_mercado.empresa_erp,
                terminal=api_mercado.terminal,
                emp_id=api_mercado.emp_id,
            )
            self.db.add(api_mercado_data)
            await self.db.commit()

            return api_mercado

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar dados de conexão com ERP: {err}",
            )

    async def get_api_mercados(self, mercado: Mercado):
        try:
            _query = select(ApiMercados).where(ApiMercados.mercado_id == mercado.id)
            _api_mercado = await self.db.execute(_query)
            _api_mercado = _api_mercado.scalar()

            return _api_mercado

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar dados de conexão com ERP: {err}",
            )

    async def delete_api_mercados(self, mercado_id: str):
        try:
            _query = delete(ApiMercados).where(ApiMercados.mercado_id == mercado_id.id)
            await self.db.execute(_query)
            await self.db.commit()

            return True
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar dados de conexão com ERP: {err}",
            )

    async def update_api_mercados(
        self, mercado_atualizado: Mercado, api_mercado: ApiMercados
    ):
        try:
            _query = (
                update(ApiMercados)
                .where(ApiMercados.mercado_id == api_mercado.id)
                .values(
                    url_base=mercado_atualizado.url_base,
                    porta=mercado_atualizado.porta,
                    empresa_erp=mercado_atualizado.empresa_erp,
                    terminal=mercado_atualizado.terminal,
                    emp_id=mercado_atualizado.emp_id,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()

            return True
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar dados de conexão com ERP: {err}",
            )
