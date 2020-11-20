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
                                  database ="cosmos_db")
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
'''
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
app =  Flask (__name__)
@app.route('/')
def hello():
  return "Hello World"

@app.route('/api/signup/username=<string:username>&name=<string:name>&pwd=<string:password>&user_type=<string:user_type>&contact=<string:contact>&address=<string:address>&email=<string:email>&balance=<float:balance>')
def signup(username,name,password,user_type,contact,address,email,balance):
  my_cursor = mydb.cursor()
  user_id = username
  user_details = (user_id,password,user_type)
  query1 = "INSERT INTO users(user_id,password,user_type) VALUES (%s,%s,%s)"
  my_cursor.execute(query1,user_details)
  mydb.commit()
  if user_type == "customer":
    customer_id = user_id
    customer_details = (customer_id,user_id,email,contact,address,balance)
    query2 = "INSERT INTO customers(customer_id,user_id,email,contact_no,address,balance) VALUES (%s,%s,%s,%s,%s,%s)"
    my_cursor.execute(query2,customer_details)
    mydb.commit()
  return {"msg":"You have registered at our website!"}
@app.route('/api/products/')
def get_product():
  pass

@app.route('/api/login/username=<string:username>&pwd=<string:password>&user_type<string:user_type>')
def login(username,password,user_type):
  my_cursor = mydb.cursor()
  query = "SELECT user_id,password FROM users WHERE user_id = '%s' AND password = '%s'" % (username,password)
  print(query)
  status = "False"
  my_cursor.execute(query)
  db_user_details = my_cursor.fetchone()
  print(db_user_details)
  if db_user_details is not None and db_user_details[0] == username and db_user_details[1] == password:
    status = "True"
    GLOBAL_VARIABLES["logged_in"] = True 

  return {"login_status": status}
#@app.route('/api/add2cart/cid=<int:cart_id>&cuid=<int:customer_id>&pid=<int:product_id>&did=<int:details_id>&quantity=<int:quantity>&cart_status=<bool:cart_status>')
@app.route('/api/add2cart/cid=<int:cart_id>&pid=<int:product_id>&quantity=<int:quantity>')
def add2cart(cart_id,customer_id,product_id,details_id,quantiy):
  import datetime
  print("add2cartargs",cart_id,customer_id,product_id,details_id,quantiy,cart_status)
  added = datetime.datetime.now()
  last_modified = datetime.datetime.now()
  query  = "INSERT INTO cart(cart_id,customer_id,product_id,details_id,quantity,cart_status) VALUES (%s,%s,%s,%s,%s,%s)"
  print("added:",type(added))
'''
@app.route('/api/removeFromCart/cid=<int:cart_id>&pid=<int:product_id>&quantity=<int:quantity>')
def removeFromCart():
  query = ''
'''
