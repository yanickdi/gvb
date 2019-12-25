import itertools

from flask import jsonify, url_for, request, Response
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import NoResultFound, UnmappedInstanceError

from app.application import app, db
from app.models.auth_token import AuthToken
from app.models.location import Location, locations_schema, location_schema
from app.models.stop_point import StopPoint, stop_points_schema, \
    stop_point_schema
from app.models.user import User, users_schema
from app.utils.utils import has_no_empty_params, Errors, error, \
    get_timetable_for_stop_point_ref_list_multithreaded
from verbund_soap_client.verbund_soap_client import VDVClient


@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


@app.route('/proxy/location-information-request', methods=['GET'])
def proxy_location_information_request():
    if 'location_name' in request.args:
        locations = VDVClient().location_information_request__location_name(
            request.args['location_name'])
        return jsonify(locations)

@app.route('/locations', methods=['GET'])
def get_locations():
    return jsonify(locations_schema.dump(Location.query.all()))

@app.route('/location/slug/<slug>/timetable', methods=['GET'])
def get_timetable_for_location_slug(slug):
    try:
        location = Location.query.filter(Location.slug == slug).one()
    except NoResultFound:
        return error(Errors.OBJECT_NOT_FOUND_ERROR, status_code=404)
    stop_point_refs = [stop_point.ref for stop_point in location.stop_points]

    result_lists = list(get_timetable_for_stop_point_ref_list_multithreaded(stop_point_refs))
    result = itertools.chain.from_iterable(result_lists) # todo: have to sort the lists while/after jaining them
    return jsonify(list(result))


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


@app.route('/location/id/<location_id>/stopPoint', methods=['POST'])
def create_stop_point(location_id):
    name, city, ref = request.json['name'], request.json['city'], request.json[
        'ref']
    stop_point = StopPoint(name=name, city=city, ref=ref, location_id=location_id)
    db.session.add(stop_point)
    db.session.commit()
    return jsonify(stop_point_schema.dump(stop_point))


@app.route('/stopPoint/id/<stop_point_id>', methods=['GET', 'DELETE'])
def rud_stop_point(stop_point_id):
    stop_point = StopPoint.query.get(stop_point_id)
    if not stop_point:
        return error(Errors.OBJECT_NOT_FOUND_ERROR)
    if request.method == 'DELETE':
        db.session.delete(stop_point)
        db.session.commit()
    return jsonify(location_schema.dump(stop_point))


@app.route('/location/id/<location_id>/stopPoints', methods=['GET'])
def get_stop_points(location_id):
    return jsonify(stop_points_schema.dump(Location.query.get(location_id).stop_points))


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
