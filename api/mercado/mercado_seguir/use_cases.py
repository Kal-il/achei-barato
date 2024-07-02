from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.mercado.models import MercadoManager
from mercado.mercado_seguir.models import SeguirMercadoManager
from usuario.usuario.models import Usuario


class MercadoSeguirUseCases:

    async def seguir_mercado(self, db: AsyncSession, usuario: Usuario, id_mercado: str):
        try:
            if usuario.dono_mercado:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Este usuário é dono de mercado.",
                )
            _mercado_manager = MercadoManager(db=db)
            mercado = await _mercado_manager.get_mercado_by_id(id_mercado)
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            _mercado_seguir_manager = SeguirMercadoManager(db=db)
            response = await _mercado_seguir_manager.seguir_mercado(
                usuario=usuario, mercado=mercado
            )
            if response:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Mercado seguido com sucesso",
                )
        except Exception as err:
            raise err

    async def get_mercados_seguidos(self, db: AsyncSession, usuario: Usuario):
        try:
            _mercado_manager = SeguirMercadoManager(db=db)
            mercados = await _mercado_manager.get_mercados_seguir(usuario)
            if not mercados:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Esse usuário não segue mercados.",
                )
            return mercados
        except Exception as err:
            raise err

    async def deixar_de_seguir_mercado(
        self, db: AsyncSession, usuario: Usuario, id_mercado: str
    ):
        try:
            if usuario.dono_mercado:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Este usuário é dono de mercado.",
                )
            _mercado_manager = MercadoManager(db=db)
            mercado = await _mercado_manager.get_mercado_by_id(id_mercado)
            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )

            _mercado_seguir_manager = SeguirMercadoManager(db=db)
            response = await _mercado_seguir_manager.delete_seguir(
                usuario=usuario, mercado=mercado
            )
            if response:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Mercado deixado de seguir com sucesso",
                )
        except Exception as err:
            raise err

    async def get_mercado_numero_seguidos(self, db: AsyncSession, usuario: Usuario):
        # numero de mercados que o usuario segue
        try:
            if usuario.dono_mercado:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Este usuário é dono de mercado.",
                )
            _mercado_manager = SeguirMercadoManager(db=db)
            numero = await _mercado_manager.get_mercado_numero_seguidos(usuario)
            if not numero:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Esse usuário não segue mercados.",
                )
            return numero
        except Exception as err:
            raise err

    async def get_mercado_numero_seguindo(
        self, db: AsyncSession, usuario: Usuario, id_mercado: str = None
    ):
        # numero de usuarios que seguem aquele mercado
        try:
            _mercado_manager = MercadoManager(db=db)
            if not id_mercado and usuario.dono_mercado:
                mercado = await _mercado_manager.get_mercado_by_usuario(usuario.id)
            else:
                mercado = await _mercado_manager.get_mercado_by_id(id_mercado)

            if not mercado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Mercado não encontrado",
                )
            _mercado_seguir_manager = SeguirMercadoManager(db=db)
            numero = await _mercado_seguir_manager.get_mercado_numero_seguindo(mercado)
            if not numero:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Esse usuário não segue mercados.",
                )
            return numero
        except Exception as err:
            raise err


use_cases_seguir_mercado = MercadoSeguirUseCases()
