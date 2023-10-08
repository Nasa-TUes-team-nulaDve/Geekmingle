from flask import *
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from configparser import ConfigParser
import psycopg2

file_handler_blueprint = Blueprint('file_handler', __name__)

config = ConfigParser()
config.read('config.ini')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB in bytes
email_address = config.get('email', 'email')
email_password = config.get('email', 'password')
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


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"})

    # Check file size
    if len(file.read()) > MAX_FILE_SIZE:
        return jsonify({"error": "File size exceeds the limit of 5 MB"})

    file.seek(0)  # Reset file pointer after reading the content

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        return jsonify({"message": "File uploaded successfully", "filename": filename})


def send_file_email(sender_email, receiver_email, password, file_path):
    # Create a MIME object
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "File from Uploads Folder"

    # Attach the file
    attachment = open(file_path, "rb")
    part = MIMEBase("application", "octet-stream")
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header("Content-Disposition",
                    "attachment; filename= " + file_path.split("/")[-1])
    message.attach(part)

    # Connect to Gmail's SMTP server
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender_email, password)

    # Send the email
    server.sendmail(sender_email, receiver_email, message.as_string())

    # Close the server connection
    server.quit()
    # Remove the file from the uploads folder
    os.remove(file_path)
    print("Email sent successfully with the file attachment.")


@file_handler_blueprint.route('/send', methods=['POST'])
def send_file():
    data = request.get_json()
    project_owner_id = data.get('owner_id')
    cur.execute("SELECT email FROM users WHERE id = %s", (project_owner_id,))
    receiver_email = cur.fetchone()[0]

    file_path = 'uploads/' + data.get('filename')

    send_file_email(email_address, receiver_email, email_password, file_path)

    return jsonify(message='Email sent successfully with the file attachment.'), 200
