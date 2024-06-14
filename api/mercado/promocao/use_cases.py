from fastapi import HTTPException, status
from mercado.produto.models import ProdutoManager
from mercado.produto.schemas import ProdutoBase
from mercado.mercado.models import MercadoManager
from mercado.promocao.models import PromocaoManager
from mercado.promocao.schemas import PromocaoBase
from usuario.usuario.models import Usuario

from sqlalchemy.ext.asyncio import AsyncSession


class PromocaoUseCases:
    async def cadastrar_promocao(
        self, db: AsyncSession, usuario: Usuario, promocao: PromocaoBase
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        mercado_manager = MercadoManager(db=db)
        promocao_manager = PromocaoManager(db=db)
        produto_manager = ProdutoManager(db)

        id_produtos = promocao.produto
        mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
        promocao = await promocao_manager.save_promocao(promocao, mercado)
        await produto_manager.update_produto_promocao(id_produtos)
    async def get_promocoes(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        try:
            mercado_manager = MercadoManager(db=db)
            promocao_manager = PromocaoManager(db=db)

            mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
            promocoes = await promocao_manager.get_promocoes(mercado.id)
            return [PromocaoBase.model_validate(promocao) for promocao in promocoes]
        except Exception as e:
            print(e)

    async def get_promocoes_mercado(self, db: AsyncSession, id_mercado: str):
        try:
            mercado_manager = MercadoManager(db=db)
            promocao_manager = PromocaoManager(db=db)

            promocoes = await promocao_manager.get_promocoes(id_mercado)
            return [PromocaoBase.model_validate(promocao) for promocao in promocoes]
            
        except Exception as e:
            print(e)
    
    async def get_produtos_promocao(self, db: AsyncSession, id_promocao: str):
        try:
            produto_manager = ProdutoManager(db)
            produtos = produto_manager.get_produtos_promocao(id_promocao)

            return [ProdutoBase(**produto.__dict__) for produto in produtos]
        except Exception as e:
            print(e)

use_cases_promocoes = PromocaoUseCases()
