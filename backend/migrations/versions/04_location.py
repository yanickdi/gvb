"""location_added

Revision ID: 433a91ddc072
Revises: 03
Create Date: 2019-12-01 12:01:25.980777

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '04'
down_revision = '03'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('location',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=200), nullable=False),
                    sa.Column('slug', sa.String(length=100), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('slug')
                    )


def downgrade():
    op.drop_table('location')
