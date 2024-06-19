"""models_postagem_promocao

Revision ID: 6ecf5539148f
Revises: 30d05c3c8db9
Create Date: 2024-06-16 21:33:20.804119

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6ecf5539148f'
down_revision: Union[str, None] = '30d05c3c8db9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usuario_postagem_promocao',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('usuario_id', sa.UUID(), nullable=True),
    sa.Column('legenda', sa.String(length=255), nullable=False),
    sa.Column('imagem', sa.String(length=255), nullable=False),
    sa.Column('denuncia', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario_usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usuario_postagem_promocao')
    # ### end Alembic commands ###
