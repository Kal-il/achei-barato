from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status, UploadFile
import uuid
from usuario.postagem_promocao.manager import PostagemPromocaoManager
from usuario.postagem_promocao.schemas import PostagemPromocaoCreate 
from usuario.usuario.schemas import UsuarioAuth 


class PostagemPromocaoUseCases:

    @staticmethod
    async def create_postagem_promocao(db: AsyncSession, foto: UploadFile, data: PostagemPromocaoCreate, usuario: UsuarioAuth):
        postagem_promocao_manager = PostagemPromocaoManager(db=db)
        try:
            if foto is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Imagem não informada",
                )
            await postagem_promocao_manager.create_postagem_promocao(data, usuario, foto)
        except HTTPException as err:
            raise err
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar postagem promocao: {err}",
            )

        return HTTPException(status_code=status.HTTP_201_CREATED, detail="Promoção Postada com sucesso!")
    
    @staticmethod
    async def get_postagem_promocao_by_usuario(db: AsyncSession, usuario: UsuarioAuth):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagens = await postagem_promocao_manager.get_postagem_promocao_by_usuario(usuario)
            _postagem_promocao_usuario = [] 
            for postagem in _postagens:
                postagem.imagem = await postagem_promocao_manager.get_postagem_promocao(postagem.imagem)
                _postagem_promocao_usuario.append(postagem)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar postagem promocao: {err}",
            )

        return _postagem_promocao_usuario

    @staticmethod 
    async def get_all_postagem_promocao(db: AsyncSession):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagens = await postagem_promocao_manager.get_all_promocao_all()
            _postagem_promocao = [] 
            for postagem in _postagens:
                postagem.imagem = await postagem_promocao_manager.get_postagem_promocao(postagem.imagem)
                _postagem_promocao.append(postagem)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar postagens promoção: {err}",
            )

        return _postagem_promocao
    
    @staticmethod
    async def delete_postagem_promocao(db: AsyncSession, id: uuid.UUID):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagem = await postagem_promocao_manager.delete_postagem_promocao(id)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao deletar postagem promocao: {err}",
            )

        return _postagem
    

postagem_promocao_usecases = PostagemPromocaoUseCases() 
