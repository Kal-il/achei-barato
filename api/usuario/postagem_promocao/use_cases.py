from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
import uuid
from usuario.postagem_promocao.manager import PostagemPromocaoManager
from usuario.postagem_promocao.schemas import PostagemPromocaoCreate 
from usuario.usuario.schemas import UsuarioAuth 


class PostagemPromocaoUseCases:

    @staticmethod
    async def create_postagem_promocao(db: AsyncSession, data: PostagemPromocaoCreate, usuario: UsuarioAuth):
        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            if not data.imagem:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Imagem não informada",
                )
            await postagem_promocao_manager.create_postagem_promocao(data, usuario)
        except HTTPException as err:
            raise err
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar postagem promocao: {err}",
            )

        return HTTPException(status_code=status.HTTP_201_CREATED, detail="Promoção Postada com sucesso!")
    
    @staticmethod
    async def get_postagem_promocao_by_id(db: AsyncSession, id: uuid.UUID):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagem = await postagem_promocao_manager.get_postagem_promocao_by_id(id)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao buscar postagem promocao: {err}",
            )

        return _postagem
    

postagem_promocao_usecases = PostagemPromocaoUseCases() 
