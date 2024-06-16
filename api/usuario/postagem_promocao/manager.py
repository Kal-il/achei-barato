import hashlib
import base64
import aiofiles
from fastapi import UploadFile
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from .models import PostagemPromocao
import uuid

class PostagemPromocaoManager:

    def __init__(self, db: AsyncSession):
        self.db = db
        
    @staticmethod
    async def upload_postagem_promocao(foto: UploadFile) -> str:
        conteudo = await foto.read()
        md5 = hashlib.md5(conteudo).hexdigest()
        store_name = f"media/{md5 + str(foto.filename)}"
        async with aiofiles.open(store_name, "wb") as nova_foto:
            await nova_foto.write(conteudo)
        return store_name

    @staticmethod
    async def get_postagem_promocao(url_foto: str) -> str:
        async with aiofiles.open(url_foto, "rb") as foto:
            postagem_promocao_foto= await foto.read()
            postagem_promocao_foto= base64.b64encode(postagem_promocao_foto).decode('utf-8')
        return postagem_promocao_foto

    async def create_postagem_promocao(self, data, usuario) -> PostagemPromocao:
        if data.imagem:
            _imagem = await self.upload_postagem_promocao(data.imagem)
        nova_postagem = PostagemPromocao(
            id=uuid.uuid4(),
            usuario_id=data.usuario_id,
            legenda=data.legenda,
            imagem=_imagem,
        )
        self.db.add(nova_postagem)
        await self.db.commit()
        return nova_postagem
    
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
            _query = update(PostagemPromocao).where(PostagemPromocao.id == id).values(denuncia=True)
            await self.db.execute(_query)
            await self.db.commit()
            return True
        except Exception as e:
            print(f"Erro ao denunciar a postagem: {e}")
            return False
        
    async def delete_postagem_promocao(self, id: uuid.UUID) -> bool:
        try:
            _query = update(PostagemPromocao).where(PostagemPromocao.id == id).values(deleted=True)
            await self.db.execute(_query)
            await self.db.commit()
            return True
        except Exception as e:
            print(f"Erro ao deletar a postagem: {e}")
            return False
