import hmac

from flask import jsonify

KEY = b'$yaHa0g2wZDKB9S2n%r^%dlZ3B@rXOIU'


def hash_password(password: str, key=KEY) -> str:
    """
    Attention: used in migration 02
    :param password:
    :param key:
    :return:
    """
    return hmac.new(key, str.encode(password), 'sha256').hexdigest()


def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)


def error(error_code):
    return jsonify({'error': error_code})


class Errors:
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'