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
    if(myresult == []): #returns empty list if not found
        return jsonify({"userId": -1})
    user_id = myresult[0][0] #else extract it out of the list of tuples
    return jsonify({"userId": user_id}) #creates response object with json data

@app.route("/register", methods=["POST"])
def register():
    dconn = connhelper()
    data = request.get_json() #grab user info
    uname = data['username']
    pword = data['password']
    email = data['email']
    mycursor = dconn.cursor()
    sql = "SELECT iduser FROM user WHERE username = %s AND password=%s" #getting data from user table in db
    adr = (uname, pword)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if(myresult == []):
        #make account then /look up account and return userId
        sql = "INSERT INTO user (username, password, email) VALUES (%s, %s, %s)"
        vals = (uname, pword, email)
        mycursor = dconn.cursor()
        try:
            mycursor.execute(sql, vals)
            dconn.commit()
            mycursor = dconn.cursor()
            sql = "SELECT iduser FROM user WHERE username = %s AND password=%s" #getting data from user table in db
            adr = (uname, pword)
            mycursor.execute(sql, adr)
            myresult = mycursor.fetchall()
            user_id = myresult[0][0]
            return jsonify({"userId": user_id})
        except: 
            return "Did not Insert"
        return
    #if account already exists tell em to kick rocks ~ -1
    return jsonify({"userId": -1})

@app.route("/selectPet", methods=["POST"])
def pet():
    dconn = connhelper()
    data = request.get_json()
    id = int(data["userId"])
    pet = int(data["pet"])
    print(id)
    print(pet)
    sql = "UPDATE user SET pet = %s, health = %s  WHERE iduser = %s"
    vals = (pet, 100, id)
    mycursor = dconn.cursor()
    try:
        mycursor.execute(sql, vals)
        dconn.commit()
    except Exception as e:
        print(f"DB Error: {e}")
        return "Error: The tables r getting quirky"
    return jsonify({"petId": pet})

if __name__=='__main__':
    app.run(debug=True)