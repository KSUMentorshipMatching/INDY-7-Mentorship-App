import mysql.connector
import hashlib
from flask import Flask, request, render_template, redirect, url_for

#Connect to MySQL database
mydb = mysql.connector.connect(
     host="localhost",
     user="root",
     password="password",
     database="indy7"
 )

mycursor = mydb.cursor()

app = Flask(__name__)

# Route for the home page
@app.route("/")
def index():
    return render_template("index.html")

# Route for sign-up form handling
@app.route("/sign_up", methods=["POST"])
def sign_up():
    email = request.form["email"]
    password = request.form["password"]
    
    # Add a salt and hash the password
    salt = "69ggez"
    hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

    # Insert user into database
    sql = "INSERT INTO Mentor (email, password) VALUES (%s, %s)"
    val = (email, hashed_password)
    mycursor.execute(sql, val)
    mydb.commit()

    mycursor.close

    return redirect(url_for('index'))

@app.route("/log_in", methods=["POST"])
def log_in():
    email = request.form["email"]
    password = request.form["password"]

    # Add a salt and hash the password
    salt = "69ggez"
    hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

    sql = "SELECT email,password FROM Mentor WHERE email={%s} AND password={%s}"
    mycursor.execute(sql,(email,hashed_password))

    result = mycursor.fetchall()
    for r in result:
        print (r)

    mycursor.close
    return redirect(url_for('index'))

# Route for forgot password page
@app.route("/forgot-create-page")
def forgot_create_page():
    return render_template("forgot-create-page.html")

# Route for login page
@app.route("/login_page")
def login_page():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
