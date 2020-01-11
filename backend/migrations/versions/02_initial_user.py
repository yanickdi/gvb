"""User

Revision ID: 065a33d2e3ce
Revises: 
Create Date: 2019-11-24 19:34:32.581348

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
from sqlalchemy import String
from sqlalchemy.sql import table, column

from app.utils.utils import hash_password

revision = '02'
down_revision = '01'
branch_labels = None
depends_on = None


def upgrade():
    data_upgrades()


def data_upgrades():
    user_table = table('user', column('username', String), column('password_digest', String))
    op.bulk_insert(user_table,
                   [{'username': 'admin', 'password_digest': hash_password('123456')}])
    pass


def downgrade():
    op.execute("delete from user")