from email.policy import HTTP
from typing import List, Union
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from mercado.mercado.models import MercadoManager, ProdutoManager
from mercado.mercado import schemas
from usuario.usuario.models import Usuario, UsuarioManager


class MercadoUseCases:
    async def restore_mercado(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este usuário não é dono de mercado.",
            )

        mercado_manager = MercadoManager(db=db)
        await mercado_manager.restore_mercado_by_usuario(usuario.id)

    async def update_mercado(
        self, db: AsyncSession, novo_mercado: schemas.MercadoUpdate, usuario: Usuario
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este usuário não é dono de mercado.",
            )

        await self._validar_cadastro(db=db, data=novo_mercado)

        mercado_manager = MercadoManager(db=db)
        await mercado_manager.update_mercado(usuario.id, mercado=novo_mercado)

    async def delete_mercado(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este usuário não é dono de mercado.",
            )

        mercado_manager = MercadoManager(db=db)
        await mercado_manager.delete_mercado_by_usuario(usuario.id)

    async def get_mercado_by_usuario(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Este usuário não é dono de mercado.",
            )

        mercado_manager = MercadoManager(db=db)
        _mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
        if not _mercado:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Mercado não encontrado."
            )

        _mercado = schemas.MercadoSchema.model_validate(_mercado)
        return _mercado

    async def get_mercado_by_nome(self, db: AsyncSession, nome: str):
        mercado_manager = MercadoManager(db=db)
        _mercados = await mercado_manager.get_mercados_by_nome(nome)

        if not _mercados:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Nome não encontrado"
            )

        return _mercados

    async def cadastrar_mercado(self, db: AsyncSession, data: schemas.MercadoCreate):
        # Verifica se o usuário já é dono de mercado
        if data.usuario.dono_mercado:
            mercado_manager = MercadoManager(db=db)
            _mercado = await mercado_manager.get_mercado_by_usuario(data.usuario.id)

            if _mercado:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Este usuário já cadastrou um mercado.",
                )

        # Verifica se campos do formulário são válidos
        await self._validar_cadastro(db, data)
        _mercado = await self._save(db, data)

        usuario_manager = UsuarioManager(db=db)
        if data.usuario:
            await usuario_manager.set_dono_mercado(data.usuario)

        return _mercado

    async def _save(self, db: AsyncSession, data: schemas.MercadoCreate):
        # Método que salva o mercado no banco de dados
        mercado_manager = MercadoManager(db=db)
        try:
            _mercado = await mercado_manager.create_mercado(data)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar mercado: {err}",
            )

        return _mercado

    async def _validar_cadastro(
        self,
        db: AsyncSession,
        data: Union[schemas.MercadoCreate, schemas.MercadoUpdate],
    ):
        # Método privado que verifica se o mercado já existe e realiza
        # a validação dos campos
        mercado_manager = MercadoManager(db=db)

        if type(data) == schemas.MercadoCreate:
            _mercado = await mercado_manager.get_mercado_by_cnpj(data.cnpj)

            if _mercado:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Já existe um cadastro com este CNPJ.",
                )

        _erros = data.validar_campos()
        if _erros:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=_erros)


class ProdutoUseCases:
    async def sync_produtos(self, db: AsyncSession, produtos: List[schemas.ProdutoBase], usuario: Usuario):
        # Método que sincroniza base de produtos do ERP com banco no Redis
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        await produto_manager.sync_produtos(_cnpj, produtos)

    async def get_produto_by_id(self, db: AsyncSession, id_produto: str, usuario: Usuario):
        # Método que obtém produto através de seu ID.
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        _produto = await produto_manager.get_produto_by_id(_cnpj, id_produto)

        if not _produto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado"
            )

        _produto = schemas.ProdutoBase(**_produto)
        return _produto

    async def get_produtos(self, db: AsyncSession, usuario: Usuario):
        _cnpj = await MercadoManager(db=db).get_cnpj_by_usuario(usuario.id)

        produto_manager = ProdutoManager(db=db)
        _produtos = await produto_manager.get_produtos_by_cnpj(_cnpj)

        if not _produtos:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado"
            )

        _produtos = [schemas.ProdutoBase(**_produto) for _produto in _produtos]
        return _produtos

mercado_usecases = MercadoUseCases()
produto_usecases = ProdutoUseCases()
