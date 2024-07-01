from datetime import datetime
import uuid
from click import File
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from mercado.produto.models import ProdutoManager
from mercado.produto.schemas import ProdutoBase, ProdutoOutput
from mercado.mercado.models import MercadoManager
from mercado.promocao.models import ProdutosPromocaoErpManager, PromocaoManager
from mercado.promocao.schemas import (
    PromocaoBase,
    PromocaoComProdutos,
    PromocaoCreate,
    PromocaoCreateManual,
    PromocaoSchema,
    PromocaoUpdate,
)
from usuario.usuario.models import Usuario

from sqlalchemy.ext.asyncio import AsyncSession

from utils.file_manager import FileManager


class PromocaoUseCases:
    async def cadastrar_promocao(
        self, db: AsyncSession, usuario: Usuario, promocao: PromocaoCreate
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        promocao_manager = PromocaoManager(db)
        produto_manager = ProdutoManager(db)

        try:
            mercado_id = await MercadoManager(db).get_mercado_id(usuario.id)

            produtos = promocao.produtos
            for produto in produtos:
                produto = await produto_manager.get_produto_por_id_erp(
                    produto, mercado_id
                )
                if (
                    produto.promocao
                    and datetime.now() < produto.promocao.data_final
                    and not produto.promocao.deleted
                ):
                    return JSONResponse(
                        content=f"O produto {produto.nome} (ID {produto.id_produto_erp})"
                        " ainda está em promoção",
                        status_code=status.HTTP_400_BAD_REQUEST,
                    )

            promocao = await promocao_manager.save_promocao(promocao, mercado_id)
            await produto_manager.update_produto_promocao(
                id_produtos=produtos, promocao=promocao, mercado_id=mercado_id
            )
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def cadastrar_promocao_manual(
        self, db: AsyncSession, usuario: Usuario, promocao: PromocaoCreateManual
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        promocao_manager = PromocaoManager(db)
        produto_manager = ProdutoManager(db)

        try:
            mercado_id = await MercadoManager(db).get_mercado_id(usuario.id)

            produtos = promocao.produtos
            for id_produto in produtos:
                produto = await produto_manager.get_produto_by_uuid(id_produto)
                if (
                    produto.promocao
                    and datetime.now() < produto.promocao.data_final
                    and not produto.promocao.deleted
                ):
                    return JSONResponse(
                        content=f"O produto {produto.nome}" " ainda está em promoção",
                        status_code=status.HTTP_400_BAD_REQUEST,
                    )

            promocao = await promocao_manager.save_promocao(promocao, mercado_id)
            await produto_manager.update_produto_promocao_manual(
                id_produtos=produtos, promocao=promocao, mercado_id=mercado_id
            )
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def get_promocao(self, db: AsyncSession, id_promocao: uuid.UUID):
        promocao_manager = PromocaoManager(db)
        produto_manager = ProdutoManager(db)
        promocao = await promocao_manager.get_promocao(id_promocao)

        if not promocao:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content="Promoção não encontrada"
            )

        produtos = await produto_manager.get_produtos_promocao(id_promocao)

        return PromocaoComProdutos(
            **promocao.__dict__,
            produtos=[ProdutoBase(**produto.__dict__) for produto in produtos],
        )

    async def get_produto_erp(self, db: AsyncSession, id_produto: uuid.UUID):
        erp_manager = ProdutosPromocaoErpManager(db)

        produto = await erp_manager.get_produto_erp(id_produto)
        if not produto:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content="Promoção não encontrada"
            )

        mercado = await MercadoManager(db).get_mercado_by_id(produto.mercado_id)
        return ProdutoOutput(
            **produto.__dict__,
            promocao_id=produto.id,
            nome_mercado=mercado.nome_fantasia,
            foto_mercado=await FileManager.get_foto(mercado.url_foto),
            foto=b"",
        )

    async def get_promocoes(self, db: AsyncSession, usuario: Usuario):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        print("chamou aqui")
        try:
            promocao_manager = PromocaoManager(db=db)
            produto_manager = ProdutoManager(db)
            mercado_manager = MercadoManager(db)
            erp_manager = ProdutosPromocaoErpManager(db)
            resultado = []
            mercado = await mercado_manager.get_mercado_by_usuario(usuario.id)
            promocoes = await promocao_manager.get_promocoes(mercado.id)
            for promocao in promocoes:
                produtos = await produto_manager.get_produtos_promocao(promocao.id)
                produtos = [
                    ProdutoOutput(
                        **produto.__dict__,
                        nome_mercado=mercado.nome_fantasia,
                        foto_mercado=await FileManager.get_foto(mercado.url_foto),
                        foto=await FileManager.get_foto(produto.url_foto),
                    )
                    for produto in produtos
                ]
                resultado.extend(produtos)

            lista_erp = []
            produtos_erp = await erp_manager.get_todos_produtos_erp()
            for produto in produtos_erp:
                produto.nome_mercado = await mercado_manager.get_mercado_nome(
                    produto.mercado_id
                )
                produto.promocao_id = produto.id
                lista_erp.append(ProdutoOutput(**produto.__dict__, foto=b""))

            return {"promocoes": resultado, "erp": lista_erp}

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def get_promocoes_mercado(self, db: AsyncSession, id_mercado: uuid.UUID):
        try:
            promocao_manager = PromocaoManager(db=db)

            promocoes = await promocao_manager.get_promocoes(id_mercado)
            return [PromocaoSchema.model_validate(promocao) for promocao in promocoes]

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def get_produtos_promocoes_mercado(
        self, db: AsyncSession, id_mercado: uuid.UUID
    ):
        try:
            promocao_manager = PromocaoManager(db=db)
            produto_manager = ProdutoManager(db)
            mercado_manager = MercadoManager(db)

            resultado = []
            mercado = await mercado_manager.get_mercado_by_id(id_mercado)
            promocoes = await promocao_manager.get_promocoes(id_mercado)
            for promocao in promocoes:
                produtos = await produto_manager.get_produtos_promocao(promocao.id)
                produtos = [
                    ProdutoOutput(
                        **produto.__dict__,
                        nome_mercado=mercado.nome_fantasia,
                        foto=await FileManager.get_foto(produto.url_foto),
                        foto_mercado=await FileManager.get_foto(mercado.url_foto),
                    )
                    for produto in produtos
                ]
                resultado.extend(produtos)

            return resultado
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def get_produtos_promocao(self, db: AsyncSession, id_promocao: uuid.UUID):
        try:
            produto_manager = ProdutoManager(db)
            produtos = await produto_manager.get_produtos_promocao(id_promocao)

            return [ProdutoBase(**produto.__dict__) for produto in produtos]
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

    async def deletar_promocao(
        self, db: AsyncSession, id_promocao: str, usuario: Usuario
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        try:
            id_mercado = await MercadoManager(db).get_mercado_id(usuario.id)
            if not id_mercado:
                return JSONResponse(
                    content="Mercado não encontrado",
                    status_code=status.HTTP_404_NOT_FOUND,
                )

            await PromocaoManager(db).delete_promocao(id_promocao, id_mercado)
            return True
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor.",
            )

    async def atualizar_promocao(
        self,
        db: AsyncSession,
        id_promocao: uuid.UUID,
        nova_promocao: PromocaoUpdate,
        usuario: Usuario,
    ):
        if not usuario.dono_mercado:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="O usuário não é dono de mercado",
            )

        promocao_manager = PromocaoManager(db)

        try:
            # Obtém-se o ID do mercado para garantir que o usuário altere apenas promoções do seu próprio mercado
            mercado_id = await MercadoManager(db).get_mercado_id(usuario.id)
            campos = {}
            for campo in nova_promocao:
                if campo[1]:
                    campos[campo[0]] = campo[1]

            if not campos:
                return

            promocao = await promocao_manager.atualizar_promocao(
                id_promocao, mercado_id, campos
            )

            if not promocao:
                return JSONResponse(
                    status_code=status.HTTP_404_NOT_FOUND,
                    content="Promoção não encontrada",
                )

            if "percentual_desconto" in campos.keys():
                produto_manager = ProdutoManager(db)
                await produto_manager.update_produto_promocao(
                    promocao=promocao, mercado_id=mercado_id
                )
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro interno no servidor",
            )

        return promocao


use_cases_promocoes = PromocaoUseCases()
