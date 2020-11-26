from flask import Flask
import sqlite3
from flask import g
from flask import jsonify
import os
DATABASE = 'cosmos.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db
app =  Flask (__name__)
conn = sqlite3.connect("cosmos.db")
c = conn.cursor()
c.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id text PRIMARY KEY,
	password text DEFAULT '' not null,
    user_type text DEFAULT '' not null
) ;""")
print("done1")
conn.commit()
c.execute("""
CREATE TABLE IF NOT EXISTS customers (
    customer_id text PRIMARY KEY,
	user_id text,
    names text  not null,
    email text DEFAULT '' not null,
    address text DEFAULT '' not null,
    contact_no text DEFAULT '' not null,
    balance REAL DEFAULT 0.0 not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ;""")
conn.commit()
print("done1")


c.execute("""CREATE TABLE IF NOT EXISTS brand (
brand_id int PRIMARY KEY,
names text DEFAULT '' not null
);""")
conn.commit()
print("done1")

c.execute("""
CREATE TABLE IF NOT EXISTS product (
    product_id int  PRIMARY KEY,
	brand_id int,
	name text DEFAULT '' not null,
    stock int DEFAULT 0 not null,
    price REAL DEFAULT 0.0 not null,
image blob,
 FOREIGN KEY (brand_id) REFERENCES brand(brand_id) 
) ;""")
print("done1")

conn.commit()
c.execute("""CREATE TABLE IF NOT EXISTS cart (
    cart_id int  PRIMARY KEY,
    customer_id text not null,
    product_id int not null,
    quantity int DEFAULT 0 not null,
    price REAL DEFAULT 0.0 not nulL,
    	FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
    
) ;""")
conn.commit()
print("done1")
conn.close()


@app.route('/')
def hello():
  return "Hello World"

@app.route('/api/signup/username=<string:username>&name=<string:name>&pwd=<string:password>&user_type=<string:user_type>&contact=<string:contact>&address=<string:address>&email=<string:email>&balance=<float:balance>')
def signup(username,name,password,user_type,contact,address,email,balance):
  conn = get_db()
  c = conn.cursor()
  user_id = username
  user_details = (user_id,password,user_type)
  query1 = "INSERT OR REPLACE INTO users(user_id,password,user_type) VALUES (?,?,?)"
  print(query1)
  c.execute(query1,user_details)
  conn.commit()
  c.execute("select * from customers")
  users = c.fetchall()
  print(users)
  print("inserted query 1")
  if user_type == "customer":
    customer_id = user_id
    customer_details = (customer_id,user_id,name,email,contact,address,balance)
    query2 = "INSERT OR REPLACE INTO customers(customer_id,user_id,names,email,contact_no,address,balance) VALUES (?,?,?,?,?,?,?)" 
    c.execute(query2,customer_details)
    conn.commit()
    c.execute("select * from customers")
    customers = c.fetchall()
    print(customers)
    print("inserted query 2")
    conn.commit()
  conn.close()
  return "You have registered at our website!"


@app.route('/api/login/username=<string:username>&pwd=<string:password>&user_type<string:user_type>')
def login(username,password,user_type):
  conn = get_db()
  c = conn.cursor()
  query = "SELECT user_id,password FROM users WHERE user_id = ? AND password = ?"
  print(query)
  log_status = "False"
  c.execute(query,(username,password))
  db_user_details = c.fetchone()
  conn.commit()
  print("login",db_user_details)
  if db_user_details is not None and db_user_details[0] == username and db_user_details[1] == password:
    log_status = "True"
  conn.close()

  return jsonify(status=log_status)

# /api/add2cart/cart_id=1&cid=dummy&pid=3&price=1500&quantity=1
@app.route('/api/add')
def add():
  return "bro wassup"
@app.route('/api/add2cart/cart_id=<int:cart_id>&cid=<string:customer_id>&pid=<int:product_id>&price=<float:price>&quantity=<int:quantity>')
def add2cart(cart_id,customer_id,product_id,price,quantity):
  conn = get_db()
  c = conn.cursor()
  import datetime
  tup = (cart_id,customer_id,product_id,quantity,price)
  print('add2cart',tup)
  added = datetime.datetime.now()
  last_modified = datetime.datetime.now()
  query  = "INSERT OR REPLACE INTO cart(cart_id,customer_id,product_id,quantity,price) VALUES (?,?,?,?,?)"
  c.execute(query,tup)
  conn.commit()
  print("added:",type(added))
  conn.close()
  return "added to cart"
@app.route('/api/place-order')
def place_order():
  return "order_placed"



if __name__=="__main__":
  app.run(debug=True)
