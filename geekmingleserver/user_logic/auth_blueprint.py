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

        if not token:
            return jsonify(message='Token is missing'), 401

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
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insert user data into the database
    cur.execute("INSERT INTO users (username, password, email) VALUES (%s, %s, %s)", (username, hashed_password.decode("utf-8"), email))
    conn.commit()
    print("register")
    print(username, hashed_password, email)

    return jsonify(message='User registered successfully'), 201

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
        token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, SECRET_KEY, algorithm='HS256')
        return jsonify(token=token), 200  # Removed .decode('utf-8')
    else:
        return jsonify(message='Invalid username or password'), 401




@auth_blueprint.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify(logged_in_as=current_user), 200

