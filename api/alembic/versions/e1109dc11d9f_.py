"""empty message

Revision ID: e1109dc11d9f
Revises: b8d5c5b4f7c9, c52d04666796
Create Date: 2024-04-22 09:23:16.814022

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e1109dc11d9f'
down_revision: Union[str, None] = ('b8d5c5b4f7c9', 'c52d04666796')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
