from usuario.usuario.models import UsuarioManager
from usuario.auth.models import UsuarioAuthGoogleManager
from usuario.consumidor.schemas import ConsumidorAuth, ConsumidorGoogle
from usuario.consumidor.models import Consumidor, ConsumidorManager
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status


class ConsumidorUseCase:

    async def create_consumidor(db: AsyncSession, data: ConsumidorAuth) -> Optional[Consumidor]:
        consumidor_manager = ConsumidorManager(db=db)

        try:
            if await consumidor_manager.get_consumidor_by_email(data.email):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este e-mail já está sendo usado",
                )
            _consumidor = await consumidor_manager.create_consumidor(data)
            if not _consumidor:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Erro ao cadastrar consumidor 1",
                )
            
            return _consumidor

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao cadastrar consumidor 2",
            )
            
    async def create_consumidor_google(db: AsyncSession, data: ConsumidorGoogle) -> Optional[Consumidor]:
        
        try:
            
            consumidor_manager = ConsumidorManager(db=db)
            usuarioauth_manager = UsuarioAuthGoogleManager(db=db)
            usuario_manager = UsuarioManager(db=db)
            
            breakpoint()
            if _usuario_google := await usuarioauth_manager.get_usuario_auth_google_by_id_google(data.id_google):
                breakpoint()
                if _consumidor := await consumidor_manager.get_consumidor_by_id(_usuario_google.id):
                    return _consumidor
                else:
                    _data_consumidor = {
                        "id": _usuario_google.id,   
                        "estado": data.estado,
                        "cidade": data.cidade,
                        "bairro": data.bairro,
                        "endereco": data.endereco,
                        "numero_endereco": data.numero_endereco,
                        "complemento": data.complemento,
                        "telefone": data.telefone
                    }
                    _consumidor = await consumidor_manager.create_consumidor(_data_consumidor)
                    
                    if not _consumidor:
                        raise HTTPException(
                            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Erro ao cadastrar consumidor",
                        )
                
                    return _consumidor
        except Exception as e:  
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Erro ao cadastrar consumidor",
            )
            

       