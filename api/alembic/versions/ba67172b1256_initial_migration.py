"""initial migration

Revision ID: ba67172b1256
Revises: 
Create Date: 2024-05-20 22:12:58.083398

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'ba67172b1256'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('mercado_promocao',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('produto', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.Column('data_inicial', sa.DateTime(), nullable=False),
    sa.Column('data_final', sa.DateTime(), nullable=False),
    sa.Column('percentual_desconto', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usuario_usuario',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('nome', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('dono_mercado', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index('_email_deleted_unique', 'usuario_usuario', ['email', 'deleted'], unique=True, postgresql_where=sa.text('NOT deleted'))
    op.create_table('mercado_mercado',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('usuario_id', sa.UUID(), nullable=True),
    sa.Column('cnpj', sa.String(length=14), nullable=False),
    sa.Column('razao_social', sa.String(length=30), nullable=False),
    sa.Column('nome_fantasia', sa.String(length=55), nullable=False),
    sa.Column('descricao', sa.String(length=500), nullable=True),
    sa.Column('logo', sa.String(length=255), nullable=True),
    sa.Column('telefone', sa.BigInteger(), nullable=False),
    sa.Column('cep', sa.String(length=8), nullable=False),
    sa.Column('estado', sa.String(length=255), nullable=False),
    sa.Column('cidade', sa.String(length=255), nullable=False),
    sa.Column('bairro', sa.String(length=255), nullable=False),
    sa.Column('endereco', sa.String(length=255), nullable=False),
    sa.Column('numero_endereco', sa.Integer(), nullable=False),
    sa.Column('complemento', sa.String(length=255), nullable=True),
    sa.Column('nome_responsavel', sa.String(length=255), nullable=False),
    sa.Column('cpf_responsavel', sa.String(length=11), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.Column('mercado_valido', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['usuario_id'], ['usuario_usuario.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cnpj')
    )
    op.create_table('usuario_auth_google',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('id_google', sa.String(length=255), nullable=False),
    sa.Column('id_usuario', sa.UUID(), nullable=False),
    sa.ForeignKeyConstraint(['id_usuario'], ['usuario_usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usuario_consumidor',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('cep', sa.String(length=8), nullable=False),
    sa.Column('estado', sa.String(length=255), nullable=False),
    sa.Column('cidade', sa.String(length=255), nullable=False),
    sa.Column('bairro', sa.String(length=255), nullable=False),
    sa.Column('endereco', sa.String(length=255), nullable=False),
    sa.Column('numero_endereco', sa.Integer(), nullable=False),
    sa.Column('complemento', sa.String(length=255), nullable=True),
    sa.Column('telefone', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['id'], ['usuario_usuario.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mercado_produto',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('mercado_id', sa.UUID(), nullable=True),
    sa.Column('nome', sa.String(length=255), nullable=True),
    sa.Column('marca', sa.String(length=255), nullable=True),
    sa.Column('data_validade', sa.DateTime(), nullable=True),
    sa.Column('ncm_produto', sa.String(length=10), nullable=True),
    sa.Column('gtin_produto', sa.String(length=14), nullable=True),
    sa.Column('mpn_produto', sa.String(length=30), nullable=True),
    sa.Column('id_produto_erp', sa.String(), nullable=True),
    sa.Column('descricao', sa.String(length=500), nullable=True),
    sa.Column('preco', sa.Float(), nullable=True),
    sa.Column('preco_promocional', sa.Float(), nullable=True),
    sa.Column('imagem', sa.String(length=255), nullable=True),
    sa.Column('codigo_produto', sa.String(length=30), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['mercado_id'], ['mercado_mercado.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mercado_produto_promocao_erp',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('mercado_id', sa.UUID(), nullable=True),
    sa.Column('nome', sa.String(length=255), nullable=True),
    sa.Column('preco', sa.Float(), nullable=True),
    sa.Column('preco_promocional', sa.Float(), nullable=True),
    sa.Column('codigo_produto', sa.String(length=30), nullable=True),
    sa.Column('ncm_produto', sa.String(length=10), nullable=True),
    sa.Column('id_produto_erp', sa.String(), nullable=True),
    sa.Column('marca', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),  # Correção aqui
    sa.Column('deleted', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['mercado_id'], ['mercado_mercado.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('mercado_produto_promocao_erp')
    op.drop_table('mercado_produto')
    op.drop_table('usuario_consumidor')
    op.drop_table('usuario_auth_google')
    op.drop_table('mercado_mercado')
    op.drop_index('_email_deleted_unique', table_name='usuario_usuario', postgresql_where=sa.text('NOT deleted'))
    op.drop_table('usuario_usuario')
    op.drop_table('mercado_promocao')
    # ### end Alembic commands ###
