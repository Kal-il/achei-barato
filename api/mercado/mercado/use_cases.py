from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.mercado.models import MercadoManager
from mercado.mercado.schemas import MercadoCreate
from usuario.usuario.models import UsuarioManager



class MercadoUseCases:
    async def cadastrar_mercado(self, db: AsyncSession, data: MercadoCreate):
        # Verifica se o usuário já é dono de mercado
        if data.usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, 
                detail="Este usuário já cadastrou um mercado."
            )

        # Verifica se campos do formulário são válidos
        await self._validar_cadastro(db, data)
        _mercado = await self._save(db, data)

        usuario_manager = UsuarioManager(db=db)
        if data.usuario:
            await usuario_manager.set_dono_mercado(data.usuario)

        return _mercado

    async def _save(self, db: AsyncSession, data: MercadoCreate):
        # Método que salva o mercado no banco de dados
        mercado_manager = MercadoManager(db=db)
        try:
           _mercado = await mercado_manager.create_mercado(data) 
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar mercado: {err}"
            )

        return _mercado

    async def _validar_cadastro(self, db: AsyncSession, data: MercadoCreate):
        # Método privado que verifica se o mercado já existe e realiza 
        # a validação dos campos
        mercado_manager = MercadoManager(db=db)
        _mercado = await mercado_manager.get_mercado_by_cnpj(data.cnpj)

        if _mercado:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Já existe um cadastro com este CNPJ."
            )

        _erros = data.validar_campos()
        if _erros:
               raise HTTPException(
                   status_code=status.HTTP_400_BAD_REQUEST,
                   detail=_erros
               )

mercado_usecases = MercadoUseCases()
