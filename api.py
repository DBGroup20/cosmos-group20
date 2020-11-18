from flask import Flask
import mysql.connector
from mysql.connector import errorcode


GLOBAL_VARIABLES = {
  "logged_in": False
}



mydb = None
try:
  mydb = mysql.connector.connect(user='root',
                                  host = '127.0.0.1',
                                  password='root',
                                  database ="customer_db")
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)


app =  Flask (__name__)
@app.route('/')

def hello():
  return "Hello World"

@app.route('/signup-api/username=<string:username>&pwd=<string:password>')
def signup(username,password):
  my_cursor = mydb.cursor()
  user_details = (username,password)
  query = "INSERT INTO customers (username,password) VALUES (%s,%s)"
  my_cursor.execute(query,user_details)
  mydb.commit()
  return {"msg":"You have registered at our website!"}

@app.route('/login-api/username=<string:username>&pwd=<string:password>')
def login(username,password):
  my_cursor = mydb.cursor()
  query = "SELECT username,password FROM customers WHERE username = '%s' AND password = '%s'" % (username,password)
  print(query)
  status = "False"
  my_cursor.execute(query)
  db_user_details = my_cursor.fetchone()
  print(db_user_details)
  if db_user_details is not None and db_user_details[0] == username and db_user_details[1] == password:
    status = "True"
    GLOBAL_VARIABLES["logged_in"] = True 

  return {"login_status": status}

