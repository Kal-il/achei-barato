from sqlalchemy.ext.asyncio import AsyncSession
from core.security import get_current_user
from mercado.mercado.schemas import MercadoCreate
from mercado.mercado.models import Mercado, MercadoManager
from fastapi import HTTPException, status
from validate_docbr import CNPJ, CPF


class MercadoUseCases:
    async def cadastrar_mercado(self, db: AsyncSession, data: MercadoCreate):
        # Verifica se campos do formulário são válidos
        _usuario = await get_current_user(db)
        print(_usuario)
        _erros = await self._validar_cadastro(data)
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
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar dados do mercado: {err}"
            )

        return _mercado

    async def _validar_cadastro(self, data: MercadoCreate):
        erros = {}
        if await self._validar_cnpj(data.cnpj):
            erros['cnpj'] = 'CNPJ inválido'

        if await self._validar_cpf(data.cpf_responsavel):
            erros['cpf'] = 'CPF inválido'

    async def _validar_cnpj(self, cnpj: str):
        validador = CNPJ()
        return validador.validate(cnpj)

    async def _validar_cpf(self, cpf: str):
        validador = CPF()
        return validador.validate(cpf)

mercado_usecases = MercadoUseCases()
