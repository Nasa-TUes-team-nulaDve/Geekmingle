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
    category = data.get('category')
    owner_username = current_user

    # Fetch the user ID based on the username
    cur.execute("SELECT id FROM users WHERE username = %s", (owner_username,))
    owner_id = cur.fetchone()

    if owner_id:
        owner_id = owner_id[0]  # Extract the user ID from the result

        cur.execute("SELECT * FROM projects WHERE project_owner = %s", (owner_id,))
        project = cur.fetchone()
        if project:
            return jsonify(message='User already has a project'), 409

        print("Creating project...")
        print(name, description, owner_id)

        # Insert the project into the projects table
        cur.execute(
            "INSERT INTO projects (project_name, project_description, project_owner, project_category) VALUES (%s, %s, %s, %s) RETURNING project_id",
            (name, description, owner_id, category))
        project_id = cur.fetchone()[0]  # Get the project ID

        # Update the user_project column in the users table
        cur.execute("UPDATE users SET user_project = %s WHERE id = %s", (project_id, owner_id))
        conn.commit()

        return jsonify(message='Project created successfully'), 200
    else:
        return jsonify(message='User not found'), 404


@project_blueprint.route('/attend', methods=['POST'])
@token_required
def attend_project(current_user):
    data = request.get_json()
    project_id = data.get('project_id')

    # Fetch the user ID based on the username
    cur.execute("SELECT id FROM users WHERE username = %s", (current_user,))
    user_id = cur.fetchone()[0]


    # Check if the project exists
    cur.execute("SELECT * FROM projects WHERE project_id = %s", (project_id,))
    project = cur.fetchone()

    if not project:
        return jsonify(message='Project not found'), 404

    # Check if the user is already attending a project
    cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cur.fetchone()
    if user[5] is not None:
        return jsonify(message='User already attending a project'), 409

   #set the working project of the user to the project id
    print("Attending project...")
    print(project_id, user_id)
    cur.execute("UPDATE users SET working_on_projects = %s WHERE id = %s", (project_id, user_id))
    conn.commit()
    return jsonify(message='User attending project successfully'), 200


@project_blueprint.route('/getall', methods=['GET'])
def get_projects():
    cur.execute("SELECT * FROM projects")
    projects = cur.fetchall()

    project_list = []
    for project in projects:
        # get the owner name from the database
        cur.execute("SELECT username FROM users WHERE id = %s", (project[3],))
        owner = cur.fetchone()[0]
        #get all the members of the project
        cur.execute("SELECT username FROM users WHERE working_on_projects = %s", (project[0],))
        members = cur.fetchall()

        # create a dictionary representing a project
        project_dict = {
            "id": project[0],
            "name": project[1],
            "description": project[2],
            "owner": owner,
            "category": project[4],
            "members": members
        }

        project_list.append(project_dict)

    # Use jsonify to return data in JSON format as an array of objects
    return jsonify(project_list), 200

#get a specific project by id
@project_blueprint.route('/get/<id>', methods=['GET'])
def get_project(id):
    cur.execute("SELECT * FROM projects WHERE project_id = %s", (id,))
    project = cur.fetchone()

    if not project:
        return jsonify(message='Project not found'), 404

    # get the owner name from the database
    cur.execute("SELECT username FROM users WHERE id = %s", (project[3],))
    owner = cur.fetchone()[0]
    #get all the members of the project
    cur.execute("SELECT username FROM users WHERE working_on_projects = %s", (project[0],))
    members = cur.fetchall()
    # create a dictionary representing a project
    project_dict = {
        "id": project[0],
        "name": project[1],
        "description": project[2],
        "owner": owner,
        "members": members,
        "category": project[4]
    }

    return jsonify(project_dict), 200