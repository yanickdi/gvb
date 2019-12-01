from flask import jsonify, url_for, request
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound, UnmappedInstanceError

from app.application import app, db
from app.models.auth_token import AuthToken
from app.models.location import Location, locations_schema, location_schema
from app.models.user import User, users_schema
from app.utils.utils import has_no_empty_params, Errors, error


@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@app.route('/locations', methods=['GET'])
def get_locations():
    return jsonify(locations_schema.dump(Location.query.all()))


@app.route('/location', methods=['POST'])
def create_location():
    name, slug = request.json['name'], request.json['slug']
    try:
        location = Location(name=name, slug=slug)
        db.session.add(location)
        db.session.commit()
    except IntegrityError:
        return error(Errors.SLUG_ALREADY_EXISTS_ERROR)
    return jsonify(location_schema.dump(location))


@app.route('/location/id/<location_id>', methods=['GET', 'DELETE'])
def rud_location(location_id):
    # find location
    location = Location.query.get(location_id)
    if not location:
        return error(Errors.OBJECT_NOT_FOUND_ERROR)
    if request.method == 'DELETE':
        db.session.delete(location)
        db.session.commit()
    return jsonify(location_schema.dump(location))


@app.route('/login', methods=['POST'])
def login():
    username, password = request.json['username'], request.json['password']

    # find user
    try:
        user = User.query.filter(User.username == username).one()
    except NoResultFound:
        return error(Errors.AUTHENTICATION_ERROR)
    # check password
    if not user.check_password(password):
        return error(Errors.AUTHENTICATION_ERROR)
    # generate password and return
    auth_token = AuthToken(user_id=user.id)
    db.session.add(auth_token)
    db.session.commit()

    return jsonify({'token': auth_token.token})


@app.route('/')
def all_links():
    links = []
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            links.append((url, rule.endpoint))
    # links is now a list of url, endpoint tuples
    return jsonify(links)