from flask import *
import psycopg2
import json
from flask import jsonify

from geekmingleserver.user_logic.auth_blueprint import auth_blueprint

from configparser import ConfigParser

app = Flask(__name__)

app.register_blueprint(auth_blueprint, url_prefix='/auth')

config = ConfigParser()
config.read('config.ini')

db_host = config.get('database', 'host')
db_port = config.get('database', 'port')
db_name = config.get('database', 'database')
db_user = config.get('database', 'user')
db_password = config.get('database', 'password')

conn = psycopg2.connect(
    host=db_host,
    port=db_port,
    database=db_name,
    user=db_user,
    password=db_password
)
cur = conn.cursor()


# Register the auth blueprint with the app


@app.route('/')
def index():
    return jsonify({'message': 'Hello, World!'})


if __name__ == '__main__':
    app.run(debug=True)
