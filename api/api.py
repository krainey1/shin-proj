import os
from dotenv import load_dotenv, dotenv_values
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def connhelper(): #helper function to establish connection
    load_dotenv() #grabbing values from .env file
    dbconn = mysql.connector.connect(
        host = os.getenv("DB_ENDPOINT"),
        user = os.getenv("DB_USER"),
        password = os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME", "project-schema") #might hide this in the .env later
    )
    return dbconn

@app.route("/")
def test_point():
    return "making sure this works :)"

@app.route("/login", methods=["POST"])
def login():
    dconn = connhelper()
    data = request.get_json() #grab user info
    uname = data['username']
    pword = data['password']
    mycursor = dconn.cursor()
    sql = "SELECT iduser FROM user WHERE username = %s AND password=%s" #getting data from user table in db
    adr = (uname, pword)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if(myresult == []):
        return jsonify({"userId": -1})
    user_id = myresult[0][0]
    return jsonify({"userId": user_id})
   

if __name__=='__main__':
    app.run(debug=True)