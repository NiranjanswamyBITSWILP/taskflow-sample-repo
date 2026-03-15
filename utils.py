# Python backend utilities with security issues
import os
import json
from flask import Flask, request
import sqlite3

app = Flask(__name__)

# Hardcoded secrets
API_KEY = 'sk-1234567890abcdefghijk'
DB_PASSWORD = 'admin123password'
SECRET_KEY = 'default_secret_key'
DATABASE_URL = 'postgresql://admin:defaultpass123@localhost/db'

# SQL injection vulnerability
@app.route('/search')
def search():
    query = request.args.get('q')
    conn = sqlite3.connect('db.sqlite')
    cursor = conn.cursor()
    sql = "SELECT * FROM items WHERE name = '" + query + "'"  # Direct concatenation!
    results = cursor.execute(sql).fetchall()
    return json.dumps(results)

# eval() usage - Dynamic code execution
@app.route('/execute', methods=['POST'])
def execute():
    code = request.json.get('code')
    eval(code)  # DANGEROUS!
    return {'status': 'executed'}

# Sensitive data logging
@app.route('/login', methods=['POST'])
def login():
    password = request.json.get('password')
    print(f'User password: {password}')  # Logging sensitive data
    return {'token': 'fake-token'}

# Weak encryption
from hashlib import md5
def hash_password(pwd):
    return md5(pwd.encode()).hexdigest()  # Weak MD5 algorithm

# JWT with default secret
import jwt
def create_token(user_id):
    return jwt.encode({'user_id': user_id}, 'secret', algorithm='HS256')

# No input validation
@app.route('/process', methods=['POST'])
def process():
    user_input = request.json.get('data')
    exec(f"result = {user_input}")  # Code injection!
    return {'result': result}

if __name__ == '__main__':
    app.run()
