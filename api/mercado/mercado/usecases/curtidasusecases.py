from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from usuario.usuario.models import Usuario

from mercado.mercado.managers import CurtidasManager, ProdutoManager


class CurtidasUseCases:

    async def save_curtidas(self, db: AsyncSession, usuario: Usuario, id_produto: str):
        try:
            _produto_manager = ProdutoManager(db=db)
            produto = await _produto_manager.get_produto_id(id_produto)
            if not produto:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Produto não encontrado",
                )

            _curtida_manager = CurtidasManager(db=db)
            curtidas = await _curtida_manager.save_curtida(produto=produto, usuario=usuario)
            if curtidas:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Curtida salva com sucesso",
                )   
        
        except Exception as err:
            raise err 
        

    async def get_curtidas(self, db: AsyncSession, usuario: Usuario):
        try:
            _curtida_manager = CurtidasManager(db=db)
            curtidas = await _curtida_manager.get_curtidas(usuario)
            if not curtidas:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Curtidas não encontradas",
                )
            return curtidas
        except Exception as err:
            raise err
        
    async def delete_curtidas(self, db: AsyncSession, usuario: Usuario, id_produto: str):
        try:
            _produto_manager = ProdutoManager(db=db)
            produto = await _produto_manager.get_produto_id(id_produto)
            if not produto:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Produto não encontrado",
                )

            _curtida_manager = CurtidasManager(db=db)
            response = await _curtida_manager.delete_curtidas(usuario=usuario, produto=produto)
            if response:
                raise HTTPException(
                    status_code=status.HTTP_200_OK,
                    detail="Curtida deletada com sucesso",
                )
        except Exception as err:
            raise err