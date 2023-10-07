from flask import *
import psycopg2
from configparser import ConfigParser
import jwt
import datetime
from functools import wraps
import json

project_blueprint = Blueprint('project', __name__)



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

@project_blueprint.route('/create', methods=['POST'])
@token_required
def create_project(current_user):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    skills = data.get('skills')
    owner = current_user
    #get the user id from the database
    cur.execute("SELECT id FROM users WHERE username = %s", (owner,))
    owner = cur.fetchone()[0]

    print("Createing project...")
    print(name, description, owner)
    cur.execute("INSERT INTO projects (project_name, project_description, project_owner, project_skills) VALUES (%s, %s, %s, %s)", (name, description, owner, skills))
    conn.commit()
    return jsonify(message='Project created successfully'), 200

@project_blueprint.route('/getall', methods=['GET'])
def get_projects():
    cur.execute("SELECT * FROM projects")
    projects = cur.fetchall()
    print(projects)
    #get the owner name from the database
    cur.execute("SELECT username FROM users WHERE id = %s", (projects[0][3],))
    owner = cur.fetchone()[0]
    print(owner)
    #replace the id in the projects tuple with the owner name
    projects = list(projects)
    projects[0] = list(projects[0])
    projects[0][3] = owner
    projects[0] = tuple(projects[0])
    print(projects)


    return jsonify(projects), 200
