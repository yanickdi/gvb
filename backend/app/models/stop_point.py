from app.application import db, ma


class StopPoint(db.Model):
    __tablename__ = 'stop_point'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(300), nullable=False)
    ref = db.Column(db.String(30), nullable=False)

    location_id = db.Column(db.Integer, db.ForeignKey('location.id'))


class StopPointSchema(ma.Schema):
    class Meta:
        fields = ('id', 'city', 'name', 'ref')


stop_point_schema = StopPointSchema()
stop_points_schema = StopPointSchema(many=True)
