import mysql.connector
import hashlib
from flask import Flask, request, render_template, redirect, url_for, session, flash
from flask_session import Session

# Connect to MySQL database

user_id= None

mydb = mysql.connector.connect(
       host="localhost",
       user="root",
       password="password",
       database="indy7"
  )

mycursor = mydb.cursor()

app = Flask(__name__)
app.secret_key='Cdaywinners2024'
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
    
    # Add a salt and hash the password
    salt = "69ggez"
    hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

    if selected_option == 'mentee':
        sql = "INSERT INTO Mentee (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"
        val = (firstName, lastName, email, hashed_password )
        mycursor.execute(sql, val)
        mydb.commit()
        mycursor.close()   
    elif selected_option == 'mentor':
        sql = "INSERT INTO Mentor (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"
        val = (firstName, lastName, email, hashed_password )
        mycursor.execute(sql, val)
        mydb.commit()
        mycursor.close()

    return redirect(url_for('index'))

# Route for log in form handling
@app.route("/log_in", methods=["POST", "GET"])
def log_in():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        # Add a salt and hash the password
        salt = "69ggez"
        hashed_password = hashlib.md5((password + salt).encode()).hexdigest()

        # Use a parameterized query to avoid SQL injection
        sql = "SELECT id, email FROM Mentor WHERE email=%s AND password=%s"
        mycursor.execute(sql, (email, hashed_password))

        result = mycursor.fetchone()

        if result:
            # Store the email in the session
            user_id, user_email = result
            session["email"] = email
            return redirect(url_for("dashboard"))  # Redirect to dashboard
        elif not result:
            flash('Invalid Login Credentials. Try Again.')  # Redirect back to login if login fails
            return (redirect(url_for("index")))
    return render_template("index.html")
    

# Route for the dashboard page (only accessible after login)
@app.route("/dashboard")
def dashboard():
    if "email" in session and session["email"]:  # Check if the user is logged in
        return render_template("dashboard.html", email=session["email"])
    else:
        return redirect(url_for("login_page"))  # Redirect to login if no session is found

# Route for forgot password page
@app.route("/forgot-create-page")
def forgot_create_page():
    return render_template("forgot-create-page.html")

# Route for login page
@app.route("/login_page")
def login_page():
    return render_template("index.html")

# Route to log out the user
@app.route("/log_out")
def log_out():
    session["email"] = None
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
