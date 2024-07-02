import hashlib
import base64
import aiofiles
from utils.file_manager import FileManager
from fastapi import UploadFile
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from usuario.postagem_promocao.schemas import PostagemPromocaoCreate
from usuario.usuario.models import Usuario
from .models import PostagemPromocao
import uuid


class PostagemPromocaoManager:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_postagem_promocao(
        self, foto: UploadFile, postagem: PostagemPromocaoCreate, usuario: Usuario
    ) -> PostagemPromocao:
        if foto:
            _imagem = await FileManager.upload_foto(foto)
        nova_postagem = PostagemPromocao(
            **postagem.__dict__,
            usuario_id=usuario.id,
            imagem=_imagem,
        )
        self.db.add(nova_postagem)
        await self.db.commit()
        return nova_postagem

    async def get_postagem_promocao_by_usuario(self, usuario) -> PostagemPromocao:
        try:
            _query = select(PostagemPromocao).where(
                PostagemPromocao.usuario_id == usuario.id
            )
            resultado = await self.db.execute(_query)
            postagem_promocao = resultado.scalars().all()
            return postagem_promocao
        except Exception as e:
            print(f"Erro ao buscar a postagem: {e}")
            return None

    async def get_postagem_promocao_by_id(self, id: uuid.UUID) -> PostagemPromocao:
        try:
            _query = select(PostagemPromocao).where(PostagemPromocao.id == id)
            resultado = await self.db.execute(_query)
            postagem_promocao = resultado.scalar_one_or_none()
            return postagem_promocao
        except Exception as e:
            print(f"Erro ao buscar a postagem: {e}")
            return None

    async def denunciar_postagem_promocao(self, id: uuid.UUID) -> bool:
        try:
            _query = (
                update(PostagemPromocao)
                .where(PostagemPromocao.id == id)
                .values(denuncia=True)
            )
            await self.db.execute(_query)
            await self.db.commit()
            return True
        except Exception as e:
            print(f"Erro ao denunciar a postagem: {e}")
            return False

    async def get_all_promocao_all(self):
        try:
            _query = (
                select(PostagemPromocao)
                .where(
                    PostagemPromocao.deleted == False,
                    PostagemPromocao.denuncia == False,
                )
                .order_by(PostagemPromocao.created_at.desc())
            )
            resultado = await self.db.execute(_query)
            postagem_promocao = resultado.scalars().all()
            return postagem_promocao
        except Exception as e:
            print(f"Erro ao buscar as postagens: {e}")
            return []

    async def delete_postagem_promocao(self, id: uuid.UUID) -> bool:
        try:
            verify_post = await self.get_postagem_promocao_by_id(id)
            if verify_post.denuncia:
                return False
            _query = (
                update(PostagemPromocao)
                .where(PostagemPromocao.id == id)
                .values(deleted=True)
            )
            await self.db.execute(_query)
            await self.db.commit()
            return True
        except Exception as e:
            print(f"Erro ao deletar a postagem: {e}")
            return False

    async def get_postagem_by_id(self, id: uuid.UUID) -> PostagemPromocao:
        try:
            _query = select(PostagemPromocao).where(PostagemPromocao.id == id)
            resultado = await self.db.execute(_query)
            return resultado.scalar()
        except Exception as e:
            print(f"Erro ao buscar a postagem: {e}")
            return None

    async def get_nome_autor(self, usuario_id: uuid.UUID) -> str:
        try:
            _query = select(Usuario.nome).where(Usuario.id == usuario_id)
            nome = await self.db.execute(_query)
            return nome.scalar()
        except Exception as e:
            print(f"Erro ao buscar nome do autor: {e}")
            return ""

    async def marcar_denuncia_postagem(self, id: uuid.UUID):
        try:
            _query = (
                update(PostagemPromocao)
                .where(PostagemPromocao.id == id)
                .values(denuncia=True)
            )
            await self.db.execute(_query)
            await self.db.commit()
        except Exception as e:
            print(f"Erro ao marcar a denuncia: {e}")
            return None
