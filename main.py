import mysql.connector
from flask import Flask,request,render_template,url_for,redirect


#Connects to the sql server. (TODO make it a getpass so that the information is not just sitting in the code. )
mydb = mysql.connector.connect(
    host = "indy7.cx8sgaa8o3lw.us-east-1.rds.amazonaws.com",
    user = "admin",
    password = "Cdaywinners2024",
    database = "INDY7"
    )

#db cursor created to submit the form data.
mycursor = mydb.cursor() 

app = Flask(__name__)

#Routes flask app to index.html that is in the templates folder
@app.route("/")
def index():
    return render_template("index.html")

#Form handler that takes form data and submits it to the mysql database
@app.route("/my_form", methods=["POST"])
def bar():
    email = request.form["email"]
    password = request.form["password"]
    sql = "INSERT INTO Mentor (email) VALUES (%s)"
    val = (email,)
    mycursor.execute(sql, val)
    mydb.commit()

    #redirects the user back to index (TODO: make it redirect to a different page. )
    return redirect(url_for('index'))
    

if __name__ == "__main__":
    app.run(debug=True)