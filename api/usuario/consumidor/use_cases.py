from usuario.usuario.models import UsuarioManager
from usuario.auth.models import UsuarioAuthGoogleManager
from usuario.consumidor.schemas import ConsumidorAuth, ConsumidorGoogle
from usuario.consumidor.models import Consumidor, ConsumidorManager
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from core.security import verify_token_google
from core.security import get_hashed_password


class ConsumidorUseCase:

    async def create_consumidor(db: AsyncSession, data: ConsumidorAuth) -> Optional[Consumidor]:
        consumidor_manager = ConsumidorManager(db=db)

        try:
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
                    _new_consumidor = await consumidor_manager.create_consumidor(_consumidor_auth_google)s
                    
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
            

"""8_fix_consumidor

Revision ID: ca26d80e0aca
Revises: 28b7b500ef27
Create Date: 2024-04-22 09:10:26.665849

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ca26d80e0aca'
down_revision: Union[str, None] = '28b7b500ef27'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('usuario_consumidor', sa.Column('id_usuario', sa.UUID(), nullable=False))
    op.drop_constraint('usuario_consumidor_id_fkey', 'usuario_consumidor', type_='foreignkey')
    op.create_foreign_key(None, 'usuario_consumidor', 'usuario_usuario', ['id_usuario'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'usuario_consumidor', type_='foreignkey')
    op.create_foreign_key('usuario_consumidor_id_fkey', 'usuario_consumidor', 'usuario_usuario', ['id'], ['id'])
    op.drop_column('usuario_consumidor', 'id_usuario')
    # ### end Alembic commands ###
    
