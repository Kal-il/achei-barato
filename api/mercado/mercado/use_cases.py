from sqlalchemy.ext.asyncio import AsyncSession
from mercado.mercado.schemas import MercadoCreate
from mercado.mercado.models import Mercado, MercadoManager
from fastapi import HTTPException, status
from validate_docbr import CNPJ


class MercadoUseCases:
    async def cadastrar_mercado(self, db: AsyncSession, data: MercadoCreate):
        # Verifica se campos do formulário são válidos
        _erros = self._clean(data)
        if _erros:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=_erros
            )

        _mercado = await self._save(db, data)
        return _mercado

    async def _save(self, db: AsyncSession, data: MercadoCreate):
        mercado_manager = MercadoManager(db=db)
        try:
           _mercado = await mercado_manager.create_mercado(data) 
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao salvar dados do mercado."
            )

        return _mercado

    async def _clean(self, data: MercadoCreate):
        erros = {}
        if self._validar_cnpj(data.cnpj):
            erros['cnpj'] = 'CNPJ inválido'

    async def _validar_cnpj(self, cnpj: str):
        validador = CNPJ()
        return validador.validate(cnpj)


