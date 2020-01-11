from uuid import uuid4

from app.application import db


class AuthToken(db.Model):
    __tablename__ = 'auth_token'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(32), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #user = db.relationship('User', back_populates='auth_tokens')

    def __init__(self, user_id):
        self.token = uuid4().hex
        self.user_id = user_id
