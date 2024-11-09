import mysql.connector
import hashlib
from flask import Flask, request, render_template, redirect, url_for, session, flash
from flask_session import Session
import os


def loadDbInfo(file_path):
    dbInfo = []
    with open(file_path, 'r') as file:
        for line in file:
            dbInfo.append(line.strip())
    return dbInfo

base_dir = os.path.dirname(os.path.abspath(__file__))
db_info_file = os.path.join(base_dir, 'dbInfo.txt')

# Connect to MySQL database

dbInfo = loadDbInfo(db_info_file)

mydb = mysql.connector.connect(
    host=dbInfo[0],     # First line in the file
    user=dbInfo[1],     
    password=dbInfo[2], 
    port=int(dbInfo[3]),
    database=dbInfo[4]  # Last line
)

app = Flask(__name__)
app.secret_key = 'Cdaywinners2024'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Route for the home page
@app.route("/")
def index():
    return render_template("index.html")

# Route for sign-up form handling
@app.route("/sign_up", methods=["POST"])
def sign_up():
    selected_option = request.form.get('role')
    email = request.form["email"]
    password = request.form["password"]
    firstName = request.form["first-name"]
    lastName = request.form["last-name"]

    mydb.reset_session()


    if not mydb.is_connected():
        mydb.reconnect()

    # Add a salt and hash the password
    salt = "69ggez"
    hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

    # Use context manager to handle cursor automatically
    with mydb.cursor() as mycursor:
        if selected_option == 'mentee':
            sql = "INSERT INTO mentee (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"
            val = (firstName, lastName, email, hashed_password)
        elif selected_option == 'mentor':
            sql = "INSERT INTO mentor (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"
            val = (firstName, lastName, email, hashed_password)

        mycursor.execute(sql, val)
        mydb.commit()

    return redirect(url_for('index'))

# Route for log in form handling
@app.route("/log_in", methods=["POST", "GET"])
def log_in():

    mydb.reset_session()


    if not mydb.is_connected():
        mydb.reconnect()

    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        # Add a salt and hash the password
        salt = "69ggez"
        hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

        # Use a parameterized query to avoid SQL injection
        sql = "SELECT id, email FROM mentor WHERE email=%s AND password=%s"

        with mydb.cursor() as mycursor:
            mycursor.execute(sql, (email, hashed_password))
            result = mycursor.fetchone()

            if result:
                # Store the email in the session
                user_id, user_email = result
                session["email"] = email
                return redirect(url_for("dashboard"))  # Redirect to dashboard
            else:
                flash('Invalid Login Credentials. Try Again.')
                return redirect(url_for("index"))

    return render_template("index.html")

# Route for the dashboard page (only accessible after login)
@app.route("/dashboard")
def dashboard():
    if "email" in session and session["email"]:  # Check if the user is logged in
        return render_template("dashboard.html", email=session["email"])
    else:
        return redirect(url_for("login_page"))  # Redirect to login if no session is found

# Route for create account page
@app.route("/create-page")
def create_page():
    return render_template("create-page.html")

# Route for forgot password page
@app.route("/forgot-page")
def forgot_page():
    return render_template("forgot-page.html")

# Route for login page
@app.route("/login_page")
def login_page():
    return render_template("index.html")

#Route for profile page
@app.route("/profile-page")
def profile_page():
    if "email" in session and session["email"]:  # Check if the user is logged in
        return render_template("profile.html", email=session["email"])
    else:
        return redirect(url_for("login_page"))  # Redirect to login if no session is found

# Route to log out the user
@app.route("/log_out")
def log_out():
    session["email"] = None
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
