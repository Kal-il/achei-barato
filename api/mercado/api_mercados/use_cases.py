from email.policy import HTTP
from typing import List, Union
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.api_mercados.models import ApiMercadosManager
from mercado.mercado.models import MercadoManager
from usuario.usuario.models import Usuario


from mercado.api_mercados.schemas import ApiMercados, ApiMercadosUpdate


class ApiMercadosUseCases:

    async def save_dados_conexao(
        self, db: AsyncSession, api_mercado: ApiMercados, usuario: Usuario
    ):

        try:
            if erros := api_mercado.validar_campos():
                print(erros);
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=erros,
                )
            mercado_manager = MercadoManager(db=db)
            mercado = await mercado_manager.get_mercado_by_usuario(
                id_usuario=usuario.id
            )
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            # if mercado.api_mercado:
            #     # raise HTTPException(
            #     #     status_code=status.HTTP_409_CONFLICT,
            #     #     detail="Já existe uma api cadastrada para este mercado",
            #     # )

            api_mercados_manager = ApiMercadosManager(db=db)
            response = await api_mercados_manager.save_api_mercados(
                api_mercado, mercado
            )
            if not response:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Erro ao salvar dados de conexão",
                )
            return response
        except Exception as err:
            raise err

    async def get_dados_conexao(self, db: AsyncSession, usuario: Usuario):
        try:
            mercado_manager = MercadoManager(db=db)
            mercado = await mercado_manager.get_mercado_by_usuario(
                id_usuario=usuario.id
            )
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            api_mercados_manager = ApiMercadosManager(db=db)
            api_mercado = await api_mercados_manager.get_api_mercados(mercado)
            if not api_mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Dados de conexão não encontrados",
                )
            return api_mercado
        except Exception as err:
            raise err

    async def delete_dados_conexao(self, db: AsyncSession, usuario: Usuario):
        try:
            mercado_manager = MercadoManager(db=db)
            mercado = await mercado_manager.get_mercado_by_usuario(
                id_usuario=usuario.id
            )
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            api_mercados_manager = ApiMercadosManager(db=db)
            response = await api_mercados_manager.delete_api_mercados(mercado)
            if response:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Dados de conexão deletados com sucesso.",
                )
            return response
        except Exception as err:
            raise err

    async def update_dados_conexao(
        self, db: AsyncSession, api_mercado: ApiMercadosUpdate, usuario: Usuario
    ):
        try:

            if erros := api_mercado.validar_campos():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=erros,
                )

            mercado_manager = MercadoManager(db=db)
            mercado = await mercado_manager.get_mercado_by_usuario(
                id_usuario=usuario.id
            )
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            api_mercados_manager = ApiMercadosManager(db=db)

            campos = {}
            for key, value in api_mercado:
                if value:
                    campos[key] = value
            
            if campos:
                response = await api_mercados_manager.update_api_mercados(
                    mercado, campos
                )

            if response:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Dados de conexão atualizados com sucesso.",
                )

        except Exception as err:
            raise err


use_cases_api_mercados = ApiMercadosUseCases()
