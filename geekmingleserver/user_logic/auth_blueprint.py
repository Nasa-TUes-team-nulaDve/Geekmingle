from flask import Blueprint, request, jsonify
import psycopg2
import bcrypt
from configparser import ConfigParser
import jwt
import datetime
from functools import wraps
import json

auth_blueprint = Blueprint('auth', __name__)

config = ConfigParser()
config.read('config.ini')

db_host = config.get('database', 'host')
db_port = config.get('database', 'port')
db_name = config.get('database', 'database')
db_user = config.get('database', 'user')
db_password = config.get('database', 'password')
SECRET_KEY = config.get("database", "key")

conn = psycopg2.connect(
    host=db_host,
    port=db_port,
    database=db_name,
    user=db_user,
    password=db_password
)
cur = conn.cursor()


# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        token = token.split(" ")[1] if token.startswith("Bearer ") else token
        if not token:
            return jsonify(message='Token is missing'), 401

        print("token")
        print(token)
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['username']
        except:
            return jsonify(message='Token is invalid'), 401

        return f(current_user, *args, **kwargs)

    return decorated


@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if username is None or password is None or email is None:
        return jsonify(message='Invalid username or password'), 401

    # Check if user already exists
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()

    if user:
        return jsonify(message='User already exists'), 401
    # Check if email already exists
    cur.execute("SELECT * FROM users WHERE email = %s", (email,))
    mail = cur.fetchone()

    if mail:
        return jsonify(message='Email already exists'), 401


    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    print("register")
    print(username, hashed_password, email)
    # Insert user data into the database
    cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                (username, hashed_password.decode("utf-8"), email))
    conn.commit()

    token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                       SECRET_KEY, algorithm='HS256')
    return jsonify(token=token), 200


@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password').encode('utf-8')  # Encode user-provided password to bytes

    # Retrieve user data from the database
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    print("users")
    print(user)

    if user and bcrypt.checkpw(password, bytes(user[2])):
        # Create JWT token
        token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                           SECRET_KEY, algorithm='HS256')
        return jsonify(token=token), 200  # Removed .decode('utf-8')
    else:
        return jsonify(message='Invalid username or password'), 401


@auth_blueprint.route('/me', methods=['GET'])
@token_required
def protected_route(current_user):
    # Retrieve user data from the database and return it except password
    cur.execute("SELECT * FROM users WHERE username = %s", (current_user,))
    user = cur.fetchone()
    print("users")
    print(user)
    current_user = {
        'username': user[1],
        'ownProjectId': user[4],
        'associatedProjects': user[5],
    }

    return current_user, 200
