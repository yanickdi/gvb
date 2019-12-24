"""empty message

Revision ID: dd5011b3e8b7
Revises: 04
Create Date: 2019-12-24 02:21:16.521239

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '05'
down_revision = '04'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('stop_point',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=200), nullable=False),
    sa.Column('name', sa.String(length=300), nullable=False),
    sa.Column('ref', sa.String(length=30), nullable=False),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['location.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('stop_point')
