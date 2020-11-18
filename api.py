from flask import Flask
import mysql.connector
from mysql.connector import errorcode


GLOBAL_VARIABLES = {
  "logged_in": False
}



mydb = None
try:
  mydb = mysql.connector.connect(user='b69ef2d19c87bd',
                                  host = 'us-cdbr-east-02.cleardb.com',
                                  password='eccef14b',
                                  database = 'heroku_ca79b3aafa57097')
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)

'''
(
    "CREATE TABLE `users` ("
    "  `user_id` int(11) NOT NULL AUTO_INCREMENT,"
    "  `user_type` varchar(14) NOT NULL,"
    "  PRIMARY KEY (`user_id`)"
    ")"
)
'''
app =  Flask (__name__)
@app.route('/')
def hello():
  # my_cursor = mydb.cursor()
  # user_details = ("talk11","123")
  # query = 
  # my_cursor.execute(query)
  # mydb.commit()
  return "Hello World"

@app.route('/api/signup/username=<string:username>&pwd=<string:password>&user_type=<string:user_type>')
def signup(username,password,user_type):
  my_cursor = mydb.cursor()
  user_details = (username,password,user_type)
  query = "INSERT INTO users(user_id,password,user_type) VALUES (%s,%s,%s)"
  my_cursor.execute(query,user_details)
  mydb.commit()
  return {"msg":"You have registered at our website!"}

@app.route('/api/login/username=<string:username>&pwd=<string:password>')
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

