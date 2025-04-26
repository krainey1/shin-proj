import os
from dotenv import load_dotenv, dotenv_values
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route("/")
def test_point():
    return "making sure this works :)"

@app.route("/login")
def login():
    return "cool placeholder"

if __name__=='__main__':
    app.run(debug=True)