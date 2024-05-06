from uuid import UUID

from sqlalchemy.exc import IntegrityError
from pydantic import EmailStr
from usuario.usuario.models import Usuario
from usuario.auth.models import UsuarioAuthGoogleManager
from usuario.consumidor.schemas import ConsumidorAuth, ConsumidorGoogle, ConsumidorSchema, ConsumidorUpdate
from usuario.consumidor.models import Consumidor, ConsumidorManager
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from core.security import verify_token_google
from core.security import get_hashed_password


class ConsumidorUseCase:
    @staticmethod
    async def create_consumidor(db: AsyncSession, data: ConsumidorAuth) -> Optional[Consumidor]:
        consumidor_manager = ConsumidorManager(db=db)
        
        if await consumidor_manager.get_consumidor_by_email(data.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este e-mail já está sendo usado",
            )
            
        erros = data.validar_campos()
        if erros:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=erros,
            )
            
        try:
            _consumidor = await consumidor_manager.create_consumidor(data)
        except Exception as err:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Erro ao cadastrar consumidor: {err}",
            )

        
        return _consumidor

    @staticmethod 
    async def create_consumidor_google(db: AsyncSession, data: ConsumidorGoogle) -> Optional[Consumidor]:
        
        try:
            consumidor_manager = ConsumidorManager(db=db)
            usuarioauth_manager = UsuarioAuthGoogleManager(db=db)
       
            _usuario_google = await usuarioauth_manager.get_usuario_auth_google_by_id_google(data.id_google)
            if _usuario_google: 
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este usuário já está cadastrado com o google",
                )
            else:
                data_user = verify_token_google(data.id_google)
                if not data_user:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Erro durante a autenticação com Google.",
                    )
                
                _consumidor = await consumidor_manager.get_consumidor_by_email(data_user.get("email"))
                if _consumidor:
                    raise HTTPException(
                        status_code=status.HTTP_409_CONFLICT,
                        detail="Este e-mail já está sendo usado",
                    )
                else:
                    
                    _data_consumidor = {
                        "nome": data_user.get("nome"),
                        "email": data_user.get("email"),
                        "hashed_password": get_hashed_password("google"),
                        "cep": data.cep,
                        "estado": data.estado,
                        "cidade": data.cidade,
                        "bairro": data.bairro,
                        "endereco": data.endereco,
                        "numero_endereco": data.numero_endereco,
                        "complemento": data.complemento,
                        "telefone": data.telefone
                    }
                    
                    _consumidor_auth_google = ConsumidorAuth(**_data_consumidor)
                    _new_consumidor = await consumidor_manager.create_consumidor(_consumidor_auth_google)
                    
                    if not _new_consumidor:
                        raise HTTPException(
                            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Erro ao cadastrar consumidor",
                        )
                        
                    _data_auth_google = {
                        "id_google": data.id_google,
                        "id_usuario": _new_consumidor.id,
                    }
                    _auth_google = await usuarioauth_manager.create_usuario_auth_google(_data_auth_google)
                    
                    if not _auth_google:
                        raise HTTPException(
                            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Erro durante a criação do registro de autenticação com Google.",
                        )
                        
                    return _new_consumidor
                
        except Exception as e:  
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Erro ao cadastrar consumidor",
            )

    @staticmethod 
    async def get_consumidor_data(db: AsyncSession, id_consumidor: UUID):
        consumidor_manager = ConsumidorManager(db=db)
        _consumidor_data = await consumidor_manager.get_consumidor_by_id(id_consumidor)

        if not _consumidor_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Dados do consumidor não encontrados"
            )

        _consumidor_data = ConsumidorSchema.model_validate(_consumidor_data)
        return _consumidor_data

    @staticmethod
    async def update_consumidor_data(db: AsyncSession, id_consumidor: UUID, new_consumidor: ConsumidorUpdate):
        update_fields = {}
        for campo in new_consumidor:
            if campo[1]:
                update_fields[campo[0]] = campo[1]

        if not update_fields:
            return

        consumidor_manager = ConsumidorManager(db=db)
        _consumidor_exists = await consumidor_manager.get_consumidor_by_id(id_consumidor)
        if not _consumidor_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Não foi possível editar consumidor: usuário não encontrado."
            )

        erros = new_consumidor.validar_campos()
        if erros:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=erros
            )

        await consumidor_manager.update_consumidor(id_consumidor, update_fields)
        _consumidor = await consumidor_manager.get_consumidor_by_id(id_consumidor)
        _consumidor = ConsumidorSchema.model_validate(_consumidor)
        return _consumidor

    @staticmethod
    async def delete_consumidor(db: AsyncSession, id_consumidor: UUID):
        consumidor_manager = ConsumidorManager(db=db)
        _consumidor_exists = await consumidor_manager.check_consumidor_exists(id_consumidor)
        if not _consumidor_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Não foi possível deletar consumidor: usuário não encontrado."
            )

        await consumidor_manager.delete_consumidor(id_consumidor)
        return "Consumidor deletado com sucesso"

    @staticmethod
    async def restore_consumidor_by_email(db: AsyncSession, email: EmailStr):
        consumidor_manager = ConsumidorManager(db=db)
        _consumidor_exists = await consumidor_manager.check_deleted_consumidor_exists(email)
        if not _consumidor_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Não foi possível restaurar consumidor: usuário não encontrado"
            )

        try:
            await consumidor_manager.restore_consumidor_by_email(email)
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Existe um usuário ativo com este e-mail"
            )
        
