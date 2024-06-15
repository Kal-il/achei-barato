from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status
from postagem_promocao.manager import PostagemPromocaoManager


class PostagemPromocaoUseCases:

    @staticmethod
    async def create_postagem_promocao(self, db: AsyncSession, data: PostagemPromocaoCreate):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        erros = data.validar_campos()
        if erros:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=erros,
            )

        try:
            _postagem = await postagem_promocao_manager.create_postagem_promocao(data)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar postagem promocao: {err}",
            )

        return HTTPException(status_code=status.HTTP_201_CREATED, detail="Promoção Postada com sucesso!")
