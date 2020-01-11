from app.application import db, ma


class Location(db.Model):
    __tablename__ = 'location'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(100), nullable=False, unique=True)

    stop_points = db.relationship('StopPoint')

class LocationSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'slug')


location_schema = LocationSchema()
locations_schema = LocationSchema(many=True)
