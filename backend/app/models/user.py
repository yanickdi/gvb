import hmac

from app.application import db, ma
from app.utils.utils import hash_password


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_digest = db.Column(db.String(64), nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password_digest = password

    def __repr__(self):
        return 'User<{}>'.format(self.username)

    def set_password(self, password: str) -> None:
        self.password_digest = hash_password(password)

    def check_password(self, password: str) -> bool:
        return hash_password(password) == self.password_digest


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username')


user_schema = UserSchema()
users_schema = UserSchema(many=True)


