from flask import *
import psycopg2
import json
import jwt
import datetime
from functools import wraps
from configparser import ConfigParser

config = ConfigParser()
config.read('config.ini')

chat_blueprint = Blueprint('chat', __name__)
SECRET_KEY = config.get("database", "key")


# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify(message='Token is missing'), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['username']
        except:
            return jsonify(message='Token is invalid'), 401

        return f(current_user, *args, **kwargs)

    return decorated


