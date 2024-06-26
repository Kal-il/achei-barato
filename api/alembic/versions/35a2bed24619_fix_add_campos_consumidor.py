"""fix_add_campos_consumidor

Revision ID: 35a2bed24619
Revises: b916fd3049d8
Create Date: 2024-06-03 10:49:42.255249

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '35a2bed24619'
down_revision: Union[str, None] = 'b916fd3049d8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('usuario_consumidor', sa.Column('url_foto', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('usuario_consumidor', 'url_foto')
    # ### end Alembic commands ###
