from utils.file_manager import FileManager
from fastapi import BackgroundTasks, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import status, UploadFile
import uuid
from usuario.postagem_promocao.manager import PostagemPromocaoManager
from usuario.postagem_promocao.schemas import PostagemPromocaoCreate
from usuario.usuario.schemas import UsuarioAuth
import smtplib
from core.config import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class PostagemPromocaoUseCases:

    @staticmethod
    async def create_postagem_promocao(
        db: AsyncSession,
        foto: UploadFile,
        postagem: PostagemPromocaoCreate,
        usuario: UsuarioAuth,
    ):
        postagem_promocao_manager = PostagemPromocaoManager(db=db)
        try:
            if foto is None:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Imagem não informada",
                )
            await postagem_promocao_manager.create_postagem_promocao(
                foto=foto, postagem=postagem, usuario=usuario
            )
        except HTTPException as err:
            raise err
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar postagem promocao: {err}",
            )

        return HTTPException(
            status_code=status.HTTP_201_CREATED, detail="Promoção Postada com sucesso!"
        )

    @staticmethod
    async def get_postagem_promocao_by_usuario(db: AsyncSession, usuario: UsuarioAuth):

        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagens = (
                await postagem_promocao_manager.get_postagem_promocao_by_usuario(
                    usuario
                )
            )
            _postagem_promocao_usuario = []
            for postagem in _postagens:
                postagem.imagem = await FileManager.get_foto(
                    postagem.imagem
                )
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
                postagem.imagem = await postagem_promocao_manager.get_foto_postagem(
                    postagem.imagem
                )
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

    @staticmethod
    def enviar_email_denuncia(id_postagem: uuid.UUID):
        try:
            email_from = settings.email_from
            email_to = settings.email_to  
            email_password = str(settings.email_password)
            
            mensagem = MIMEMultipart()
            mensagem['From'] = email_from
            mensagem['To'] = email_to
            mensagem['Subject'] = 'Denúncia de Postagem'

            corpo_email = f'A postagem com ID {id_postagem} recebeu uma denúncia.'
            mensagem.attach(MIMEText(corpo_email, 'plain'))

            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(email_from, email_password)
            server.send_message(mensagem)
            server.quit()
        except smtplib.SMTPAuthenticationError as auth_err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro de autenticação ao enviar email de denuncia: {auth_err.smtp_code}, {auth_err.smtp_error.decode('utf-8')}. Por favor, verifique suas credenciais e as configurações de segurança da conta Google.",
            )
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao enviar email de denuncia: {err}",
            )

    @staticmethod
    async def denunciar_postagem_promocao(db: AsyncSession, id_postagem: uuid.UUID, background_tasks: BackgroundTasks):
        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagem = await postagem_promocao_manager.get_postagem_by_id(id_postagem)

            if _postagem is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Postagem não encontrada",
                )


            background_tasks.add_task(PostagemPromocaoUseCases.enviar_email_denuncia, id_postagem)

        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao denunciar postagem promocao: {err}",
            )
        
    
    @staticmethod
    async def marcar_postagem_denuncia(db: AsyncSession, id_postagem:uuid.UUID):
        postagem_promocao_manager = PostagemPromocaoManager(db=db)

        try:
            _postagem = await postagem_promocao_manager.get_postagem_by_id(id_postagem)
            if _postagem is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Postagem não encontrada",
                )

            await postagem_promocao_manager.marcar_denuncia_postagem(id_postagem)
            
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao marcar denúncia na postagem: {err}",
            )

        return _postagem

    @staticmethod
    async def get_postagem(db: AsyncSession, id_postagem: uuid.UUID):
        postagem_promocao_manager = PostagemPromocaoManager(db)

        try:
            postagem = await postagem_promocao_manager.get_postagem_by_id(id_postagem)
            if postagem is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Postagem não encontrada",
                )
            postagem.imagem = await postagem_promocao_manager.get_foto_postagem(
                postagem.imagem
            )
            postagem.autor = await postagem_promocao_manager.get_nome_autor(
                postagem.usuario_id
            )
            return postagem
        except HTTPException as err:
            raise err
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao consultar postagem: {e}",
            )

postagem_promocao_usecases = PostagemPromocaoUseCases()
