from fastapi import HTTPException, status
from mercado.mercado.managers import MercadoManager, PromocaoManager
from mercado.mercado.schemas import PromocaoBase
from usuario.usuario.models import Usuario

from sqlalchemy.ext.asyncio import AsyncSession


class PromocaoUseCases:
    async def cadastrar_promocao(
        self, db: AsyncSession, usuario: Usuario, promocao: PromocaoBase
    ):
        if not usuario.dono_mercado:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="O usuário não é dono de mercado")

        try:
            mercado_manager = MercadoManager(db=db)
            promocao_manager = PromocaoManager(db=db)

            mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
            await promocao_manager.save_promocao(promocao, mercado)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno do servidor",
            )

    async def get_promocoes(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="O usuário não é dono de mercado")       

        try:
            mercado_manager = MercadoManager(db=db)
            promocao_manager = PromocaoManager(db=db)

            mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
            promocoes = await promocao_manager.get_promocoes(mercado.id)
            return [PromocaoBase.model_validate(promocao) for promocao in promocoes]
        except Exception as e:
            print(e)

