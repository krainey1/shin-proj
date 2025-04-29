import os
from dotenv import load_dotenv, dotenv_values
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import bcrypt
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
    data = request.get_json() #grab user info ~ json data from body into dictionary
    uname = data['username']
    pword = data['password']
    mycursor = dconn.cursor()
    sql = "SELECT * FROM user WHERE username = %s" #getting data from user table in db
    adr = (uname,)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if(myresult == []): #returns empty list if not found
        return jsonify({"userId": -1})
    #check password ~ this is kind of inconsequential rn
    pword = pword.encode('utf-8')
    check = bcrypt.checkpw(pword, myresult[0][2].encode('utf-8'))
    if(check):
        user_id = myresult[0][0] #else extract it out of the list of tuples
        return jsonify({"userId": user_id, "petId": myresult[0][4]}) #creates response object with json data
    return jsonify({"userId": -1, "petId": -1})

@app.route("/register", methods=["POST"])
def register():
    dconn = connhelper()
    data = request.get_json() #grab user info
    uname = data['username']
    pword = data['password']
    email = data['email']
    mycursor = dconn.cursor()
    sql = "SELECT iduser FROM user WHERE username = %s" #getting data from user table in db
    adr = (uname,)
    mycursor.execute(sql, adr)
    myresult = mycursor.fetchall()
    if(myresult == []):
        #make account then /look up account and return userId
        #lets hash for security
        bytes = pword.encode('utf-8') #convert to arr of bytes
        salt = bcrypt.gensalt() #~generate salt - pseudorandom string added to password
        pword = bcrypt.hashpw(bytes, salt) #final hash
        sql = "INSERT INTO user (username, password, email) VALUES (%s, %s, %s)"
        vals = (uname, pword, email)
        mycursor = dconn.cursor()
        try:
            mycursor.execute(sql, vals)
            dconn.commit()
            mycursor = dconn.cursor()
            sql = "SELECT iduser FROM user WHERE username = %s" #getting data from user table in db
            adr = (uname,)
            mycursor.execute(sql, adr)
            myresult = mycursor.fetchall()
            user_id = myresult[0][0]
            return jsonify({"userId": user_id})
        except: 
            return "Did not Insert"
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

@app.route("/add", methods=["POST"])
def add():
    data = request.get_json() 
    """
    we got the data we need
    print(data["userid"])
    print(data["hname"])
    print(data["days"])
    print(data["reminder"])

    want to rebuild the days list -> convert to json
    do insertion
    """
    day_data = data["days"]
    #remap those abbreviations to the full name of the day of the week ~ think this will be easier for day checking???
    day_map = {
    "Mon": "Monday",
    "Tues": "Tuesday",
    "Wed": "Wednesday",
    "Thur": "Thursday",
    "Fri": "Friday",
    "Sat": "Saturday",
    "Sun": "Sunday"
    }   
    id = data["userid"]
    habit = data["hname"]
    reminder = data["reminder"]
    day_data = [day_map.get(d, d) for d in day_data]
    print(day_data)
    day_data = json.dumps(day_data)
    dconn = connhelper()
    sql = "INSERT INTO user_habits (id, habit, days, reminder) VALUES (%s, %s, %s, %s)"
    vals = (id, habit, day_data, reminder)
    mycursor = dconn.cursor()
    try:
        mycursor.execute(sql, vals)
        dconn.commit()
        return jsonify({"valid": 1}) #send a confimation response
    except Exception as e:
        print(f"DB Error: {e}")
        return jsonify({"valid": 0})


#need to check day of the week + if task has been completed 
@app.route("/getTodo", methods = ["POST"])
def todo():

    return 

if __name__=='__main__':
    app.run(debug=True)