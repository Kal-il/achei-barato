from email.policy import HTTP
from typing import List, Union
import uuid
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.promocao.schemas import ProdutoPromocaoErp
from mercado.erp_requests import ErpRequest
from mercado.mercado.models import MercadoManager
from mercado.produto.models import ProdutoManager
from mercado.promocao.models import ProdutosPromocaoErpManager
from usuario.usuario.models import Usuario
from .schemas import ProdutoBase, ProdutoOutput



class ProdutoUseCases:
    async def sync_produtos(
        self, db: AsyncSession, produtos: List[ProdutoBase], usuario: Usuario
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

        _produto = ProdutoBase(**_produto)
        return _produto

    async def get_produto_by_uuid(
        self, db: AsyncSession, id_produto: uuid.UUID
    ):
        # Método que obtém produto através de seu ID.
        produto_manager = ProdutoManager(db=db)
        _produto = await produto_manager.get_produto_by_uuid(id_produto)

        mercado_manager = MercadoManager(db)
        _mercado = await mercado_manager.get_mercado_by_id(_produto.mercado_id)

        if not _produto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
            )

        _produto = ProdutoOutput(**_produto.__dict__, nome_mercado=_produto.mercado.nome_fantasia)
        return _produto

    async def get_produtos(self, db: AsyncSession, usuario: Usuario):
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        _produtos = await produto_manager.get_produtos_by_cnpj(_cnpj)

        if not _produtos:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
            )

        _produtos = [ProdutoBase(**_produto) for _produto in _produtos]
        return _produtos

    async def sync_produtos_promocao_erp(self, db: AsyncSession, usuario: Usuario):
        try:
          
            mercado = await MercadoManager(db=db).get_mercado_by_usuario(usuario.id)

            erp_requests = ErpRequest()
            erp_requests.get_dados_conexao(db, mercado)
            lista_produtos_promo = await erp_requests.run_test()

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

    async def cadastrar_produto(
        self, db: AsyncSession, produto: ProdutoBase, usuario: Usuario
    ):
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
        
    async def pesquisar_nome(self, db: AsyncSession, nome: str):
        try:
            produto_manager = ProdutoManager(db=db)
            objetos = await produto_manager.get_produtos_or_mercado(nome)
            if not objetos['mercados'] and not objetos['produtos']:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Produto não encontrado",
                )
            
            return objetos
        except Exception as err:
            raise err

    async def get_todos_produtos(self, db: AsyncSession):
        produto_manager = ProdutoManager(db)
        mercado_manager = MercadoManager(db)
        produtos = await produto_manager.get_todos_produtos()
        for produto in produtos:
            produto.nome_mercado = await mercado_manager.get_mercado_nome(produto.mercado_id)

        return [ProdutoOutput(**produto.__dict__) for produto in produtos] 

use_cases_produtos = ProdutoUseCases()
