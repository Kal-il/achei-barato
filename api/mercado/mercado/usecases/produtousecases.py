
from email.policy import HTTP
from typing import List, Union
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.mercado import schemas
from usuario.usuario.models import Usuario

from mercado.mercado.erp_requests import ErpRequest

from mercado.mercado.managers import MercadoManager, ProdutosPromocaoErpManager, ProdutoManager
from mercado.mercado.schemas import ProdutoPromocaoErp


class ProdutoUseCases:
    async def sync_produtos(
        self, db: AsyncSession, produtos: List[schemas.ProdutoBase], usuario: Usuario
    ):
        # Método que sincroniza base de produtos do ERP com banco no Redis
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        await produto_manager.sync_produtos(_cnpj, produtos)

    async def get_produto_by_id(
        self, db: AsyncSession, id_produto: str, usuario: Usuario
    ):
        # Método que obtém produto através de seu ID.
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        _produto = await produto_manager.get_produto_by_id(_cnpj, id_produto)

        if not _produto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
            )

        _produto = schemas.ProdutoBase(**_produto)
        return _produto

    async def get_produtos(self, db: AsyncSession, usuario: Usuario):
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        _produtos = await produto_manager.get_produtos_by_cnpj(_cnpj)

        if not _produtos:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
            )

        _produtos = [schemas.ProdutoBase(**_produto) for _produto in _produtos]
        return _produtos

    async def sync_produtos_promocao_erp(self, db: AsyncSession, usuario: Usuario):
        try:
          
            lista_produtos_promo = await ErpRequest.run_test()

            if not lista_produtos_promo:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Produtos não encontrados",
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

            produtos = []
            for produto_promo in lista_produtos_promo:
                produto_promocao = ProdutoPromocaoErp(
                    nome=produto_promo.get("descricao"),
                    preco=produto_promo.get("valorVenda"),
                    preco_promocional=produto_promo.get("vlrPromocao"),
                    codigo_produto=str(produto_promo.get("codBarras")),
                    ncm_produto=produto_promo.get("ncm"),
                    id_produto_erp=str(produto_promo.get("proId")),
                    marca=produto_promo.get("fabricante"),
                )
                
                produtos.append(produto_promocao)

            produto_manager = ProdutosPromocaoErpManager(db=db)
            response = await produto_manager.save_produtos_erp(produtos, mercado)
            if not response:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Erro ao salvar produtos",
                )

            return lista_produtos_promo

        except Exception as err:
            raise err
        
    async def cadastrar_produto(self, db: AsyncSession, produto: schemas.ProdutoBase, usuario: Usuario):    
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

            produto_manager = ProdutoManager(db=db)
            response = await produto_manager.save_produto(produto, mercado)
            if not response:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Erro ao salvar produto",
                )
            return response
        except Exception as err:
            raise err
