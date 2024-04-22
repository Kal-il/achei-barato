from usuario.consumidor.schemas import ConsumidorAuth
from usuario.consumidor.models import Consumidor, ConsumidorManager
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status


class ConsumidorUseCase:

    async def create_consumidor(db: AsyncSession, data: ConsumidorAuth) -> Optional[Consumidor]:
        consumidor_manager = ConsumidorManager(db=db)

        try:
            breakpoint()
            if await consumidor_manager.get_consumidor_by_email(data.email):
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este e-mail já está sendo usado",
                )
            _consumidor = await consumidor_manager.create_consumidor(data)
            if not _consumidor:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Erro ao cadastrar consumidor",
                )
            
            
            return _consumidor

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Erro ao cadastrar consumidor",
            )

       