from flask import jsonify, url_for, request
from sqlalchemy.orm.exc import NoResultFound

from app.application import app, db
from app.models.auth_token import AuthToken
from app.models.user import User, users_schema
from app.utils.utils import has_no_empty_params, Errors, error


@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)


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