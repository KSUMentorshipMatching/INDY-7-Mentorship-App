import mysql.connector
from flask import Flask,request,render_template,url_for,redirect

mydb = mysql.connector.connect(
    host = "indy7.cx8sgaa8o3lw.us-east-1.rds.amazonaws.com",
    user = "admin",
    password = "Cdaywinners2024",
    database = "INDY7"
    )

mycursor = mydb.cursor()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/my_form", methods=["POST"])
def bar():
    email = request.form["email"]
    password = request.form["password"]
    sql = "INSERT INTO Mentor (email) VALUES (%s)"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()

    return redirect(url_for('index'))
    

if __name__ == "__main__":
    app.run(debug=True)