from mercado.mercado.managers import PromocaoManager
from mercado.mercado.schemas import PromocaoBase
from usuario.usuario.models import Usuario

from sqlalchemy.ext.asyncio import AsyncSession


class PromocaoUseCases:
    async def cadastrar_promocao(
        db: AsyncSession, usuario: Usuario, promocao: PromocaoBase
    ):
        try:
            promocao_manager = PromocaoManager(db=db)

        except Exception as e:
            print(e)
