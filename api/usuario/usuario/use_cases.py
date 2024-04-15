from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from usuario.usuario.models import Usuario, UsuarioManager
from usuario.usuario.schemas import UsuarioAuth


class UsuarioUseCase:
    @staticmethod
    async def create_usuario(db: AsyncSession, data: UsuarioAuth) -> Optional[Usuario]:
        usuario_manager = UsuarioManager(db=db)

        try:
            _usuario = await usuario_manager.create_usuario(data)
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este e-mail já está sendo usado",
            )

        return _usuario
