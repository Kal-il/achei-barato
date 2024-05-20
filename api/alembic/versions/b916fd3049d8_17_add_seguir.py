"""17_add_seguir

Revision ID: b916fd3049d8
Revises: 6622070a1f10
Create Date: 2024-05-19 20:38:29.671809

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b916fd3049d8'
down_revision: Union[str, None] = '6622070a1f10'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mercado_seguir',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('mercado_id', sa.UUID(), nullable=True),
    sa.Column('usuario_id', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['mercado_id'], ['mercado_mercado.id'], ),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario_usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mercado_seguir')
    # ### end Alembic commands ###
