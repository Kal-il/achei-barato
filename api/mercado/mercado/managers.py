import uuid
from mercado.mercado.models import (
    Mercado,
    Produto,
    ProdutosPromocaoErp,
    ApiMercados,
    Curtidas,
    Promocao,
    SeguirMercado,
)
import datetime
from typing import List

from fastapi import HTTPException, status
from sqlalchemy import (
    delete,
    select,
    update,
    func,
)
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import Base
from mercado.mercado.schemas import (
    MercadoCreate,
    ProdutoBase,
    ProdutoPromocaoErp,
    PromocaoBase,
)
from usuario.usuario.models import Usuario


from core.redis import redis
from sqlalchemy.orm import selectinload


class MercadoManager:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_mercado(self, data: MercadoCreate):
        _mercado = Mercado(
            cnpj=data.cnpj,
            usuario_id=data.usuario.id,
            razao_social=data.razao_social,
            nome_fantasia=data.nome_fantasia,
            telefone=data.telefone,
            descricao=data.descricao,
            cep=data.cep,
            estado=data.estado,
            cidade=data.cidade,
            bairro=data.bairro,
            endereco=data.endereco,
            numero_endereco=data.numero_endereco,
            nome_responsavel=data.nome_responsavel,
            cpf_responsavel=data.cpf_responsavel,
        )

        self.db.add(_mercado)
        await self.db.commit()

        return _mercado

    async def get_mercado_by_cnpj(self, cnpj: str):
        _query = select(Mercado).where(Mercado.cnpj == cnpj)
        _mercado = await self.db.execute(_query)
        _mercado = _mercado.scalar()

        return _mercado

    async def get_mercado_by_id(self, mercado_id: str):
        _query = select(Mercado).where(Mercado.id == mercado_id)
        _mercado = await self.db.execute(_query)
        _mercado = _mercado.scalar()

        return _mercado

    async def get_mercado_by_usuario(self, id_usuario: str):
        _query = select(Mercado).where(Mercado.usuario_id == id_usuario)
        _mercado = await self.db.execute(_query)
        _mercado = _mercado.scalar()

        return _mercado

    async def get_mercados_by_nome(self, nome: str):
        _query = select(Mercado).filter(Mercado.nome_fantasia.like(f"{nome}%"))
        _mercados = await self.db.execute(_query)
        _mercados = _mercados.scalars().all()

        return _mercados

    async def get_mercado_id(self, id_usuario: str):
        _query = select(Mercado.id).filter(Mercado.usuario_id == id_usuario)
        _mercado_id = await self.db.execute(_query)
        _mercado_id = _mercado_id.scalar()

        return _mercado_id

    async def get_cnpj_by_usuario(self, id_usuario: str):
        _query = select(Mercado.cnpj).filter(Mercado.usuario_id == id_usuario)
        _cnpj = await self.db.execute(_query)
        _cnpj = _cnpj.scalar()

        return _cnpj

    async def get_mercados(self):
        _query = select(Mercado).filter(Mercado.deleted == False)
        _mercados = await self.db.execute(_query)
        _mercados = _mercados.scalars().all()

        return _mercados

    async def update_mercado(self, id_usuario: str, dados_mercado: dict):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    **dados_mercado,
                    updated_at=datetime.datetime.now(),
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar dados do mercado: {err}",
            )

    async def delete_mercado_by_usuario(self, id_usuario):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    deleted=True,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar mercado: {err}",
            )

    async def restore_mercado_by_usuario(self, id_usuario):
        try:
            _query = (
                update(Mercado)
                .where(Mercado.usuario_id == id_usuario)
                .values(
                    deleted=False,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao restaurar mercado: {err}",
            )


class ProdutoManager:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def clean_redis(self, id_mercado):
        await redis.flush()

    async def get_produto_by_id(self, cnpj: str, id_produto: str):
        _produto = await redis.get_produto(cnpj=cnpj, id_produto=id_produto)

        return _produto

    async def get_produtos_by_cnpj(self, cnpj: str):
        _produtos = await redis.get_produtos(cnpj)
        return _produtos

    async def sync_produtos(self, cnpj: str, produtos: List[ProdutoBase]):
        await redis.store_produtos_hash(cnpj=cnpj, produtos=produtos)

    async def save_produto(self, produto: ProdutoBase, mercado: Mercado):
        try:
            _produto = Produto(
                mercado_id=mercado.id,
                nome=produto.nome,
                marca=produto.marca,
                data_validade=produto.data_validade,
                ncm_produto=produto.ncm_produto,
                gtin_produto=produto.gtin_produto,
                mpn_produto=produto.mpn_produto,
                id_produto_erp=produto.id_produto_erp,
                descricao=produto.descricao,
                preco=produto.preco,
                preco_promocional=produto.preco_promocional,
                codigo_produto=produto.codigo_produto,
            )

            self.db.add(_produto)
            await self.db.commit()

            return _produto
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar produto: {err}",
            )

    async def get_produto_id(self, id_produto: str):
        _query = select(Produto).where(Produto.id == id_produto)
        _produto = await self.db.execute(_query)
        _produto = _produto.scalar()

        return _produto


class ProdutosPromocaoErpManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_produtos_erp(
        self, produtos: List[ProdutoPromocaoErp], mercado: Mercado
    ):
        for produto in produtos:

            _produto = ProdutosPromocaoErp(
                mercado_id=mercado.id,
                nome=produto.nome,
                marca=produto.marca,
                ncm_produto=produto.ncm_produto,
                id_produto_erp=produto.id_produto_erp,
                preco=produto.preco,
                preco_promocional=produto.preco_promocional,
                codigo_produto=produto.codigo_produto,
            )

            self.db.add(_produto)
            await self.db.commit()

        return produtos


class ApiMercadosManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_api_mercados(self, api_mercado: ApiMercados, mercado: Mercado):
        try:
            api_mercado_data = ApiMercados(
                mercado_id=mercado.id,
                url_base=api_mercado.url_base,
                porta=api_mercado.porta,
                empresa_erp=api_mercado.empresa_erp,
                terminal=api_mercado.terminal,
                emp_id=api_mercado.emp_id,
            )
            self.db.add(api_mercado_data)
            await self.db.commit()

            return api_mercado

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar dados de conexão com ERP: {err}",
            )

    async def get_api_mercados(self, mercado: Mercado):
        try:
            _query = select(ApiMercados).where(ApiMercados.mercado_id == mercado.id)
            _api_mercado = await self.db.execute(_query)
            _api_mercado = _api_mercado.scalar()

            return _api_mercado

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar dados de conexão com ERP: {err}",
            )

    async def delete_api_mercados(self, mercado_id: str):
        try:
            _query = delete(ApiMercados).where(ApiMercados.mercado_id == mercado_id.id)
            await self.db.execute(_query)
            await self.db.commit()

            return True
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar dados de conexão com ERP: {err}",
            )

    async def update_api_mercados(
        self, mercado_atualizado: Mercado, api_mercado: ApiMercados
    ):
        try:
            _query = (
                update(ApiMercados)
                .where(ApiMercados.mercado_id == api_mercado.id)
                .values(
                    url_base=mercado_atualizado.url_base,
                    porta=mercado_atualizado.porta,
                    empresa_erp=mercado_atualizado.empresa_erp,
                    terminal=mercado_atualizado.terminal,
                    emp_id=mercado_atualizado.emp_id,
                )
            )

            await self.db.execute(_query)
            await self.db.commit()

            return True
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao atualizar dados de conexão com ERP: {err}",
            )


class CurtidasManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_curtida(self, produto: Produto, usuario: Usuario):
        try:
            _curtida = Curtidas(
                produto_id=produto.id,
                usuario_id=usuario.id,
            )
            self.db.add(_curtida)
            await self.db.commit()

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar curtida: {err}",
            )

    async def get_curtidas(self, usuario: Usuario):
        try:
            _query = select(Curtidas).where(Curtidas.usuario_id == usuario.id)
            _curtida = await self.db.execute(_query)
            _curtida = _curtida.scalar()

            return _curtida

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar curtida: {err}",
            )

    async def delete_curtidas(self, produto: Produto, usuario: Usuario):
        try:
            _query = delete(Curtidas).where(
                Curtidas.produto_id == produto.id, Curtidas.usuario_id == usuario.id
            )
            await self.db.execute(_query)
            await self.db.commit()

            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar curtida: {err}",
            )


class SeguirMercadoManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def seguir_mercado(self, mercado: Mercado, usuario: Usuario):
        try:
            _seguir = SeguirMercado(
                mercado_id=mercado.id,
                usuario_id=usuario.id,
            )
            self.db.add(_seguir)
            await self.db.commit()
            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao salvar seguir: {err}",
            )

    async def delete_seguir(self, mercado: Mercado, usuario: Usuario):
        try:
            _query = delete(SeguirMercado).where(
                SeguirMercado.mercado_id == mercado.id,
                SeguirMercado.usuario_id == usuario.id,
            )
            await self.db.execute(_query)
            await self.db.commit()

            return True

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar seguir: {err}",
            )

    async def get_mercados_seguir(self, usuario: Usuario):
        try:
            _query = (
                select(SeguirMercado)
                .where(SeguirMercado.usuario_id == usuario.id)
                .options(selectinload(SeguirMercado.mercado))
            )
            result = await self.db.execute(_query)
            _seguir = result.scalars().all()

            mercados = [seguir.mercado for seguir in _seguir]
            return mercados

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar seguir: {err}",
            )

    async def get_mercado_numero_seguidos(self, usuario: Usuario):
        try:
            _query = (
                select(func.count())
                .select_from(SeguirMercado)
                .where(SeguirMercado.usuario_id == usuario.id)
            )
            _numero_seguidos = await self.db.execute(_query)
            _numero_seguidos = _numero_seguidos.scalar()

            return _numero_seguidos

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar número de seguidos: {err}",
            )

    async def get_mercado_numero_seguindo(self, mercado: Mercado):
        try:
            _query = (
                select(func.count())
                .select_from(SeguirMercado)
                .where(SeguirMercado.mercado_id == mercado.id)
            )
            _numero_seguindo = await self.db.execute(_query)
            _numero_seguindo = _numero_seguindo.scalar()

            return _numero_seguindo

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar número de seguindo: {err}",
            )

class PromocaoManager:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def save_promocao(self, promocao: PromocaoBase, mercado):
        try:
            promocao = Promocao(**promocao.__dict__, mercado=mercado)

            self.db.add(promocao)
            await self.db.commit()
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    async def get_promocoes(self, mercado_id: uuid.UUID):
        try:
            query = select(Promocao).where(Promocao.mercado_id == mercado_id)

            promocoes = await self.db.execute(query)
            return promocoes.scalars().all()
        except Exception as e:
            raise e
