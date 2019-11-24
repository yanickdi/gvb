import hmac

KEY = b'$yaHa0g2wZDKB9S2n%r^%dlZ3B@rXOIU'


def hash_password(password: str, key=KEY) -> str:
    """
    Attention: used in migration 02
    :param password:
    :param key:
    :return:
    """
    return hmac.new(key, str.encode(password), 'sha256').hexdigest()
