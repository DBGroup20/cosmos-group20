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
print("done creating users")
conn.commit()
c.execute("""
CREATE TABLE IF NOT EXISTS customers (
    customer_id text PRIMARY KEY,
	user_id text,
    name text  not null,
    email text DEFAULT '' not null,
    address text DEFAULT '' not null,
    contact_no text DEFAULT '' not null,
    balance REAL DEFAULT 0.0 not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ;""")
conn.commit()
print("done creating customers")


c.execute("""CREATE TABLE IF NOT EXISTS brand (
brand_id int PRIMARY KEY,
name text DEFAULT '' not null
);""")
conn.commit()
print("done creating brand")

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
print("done creating product")

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
print("done creating cart")

c.execute( """
 CREATE TABLE IF NOT EXISTS orders (
    order_id int  PRIMARY KEY,
    customer_id text not null,
    cart_id int not null,
    product_id int not null,
    status text DEFAULT 'processing' not null,
    created datetime ,
    status_modified datetime ,
    total REAL DEFAULT 0.0 not null,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
    );
"""
)

conn.commit()

print("done creating orders")
c.execute("""
CREATE TABLE IF NOT EXISTS retailers (
  retailer_id int  PRIMARY KEY,
	brand_id int,
  contact_no text DEFAULT '' not null,
  name text DEFAULT '' not null
    );
""")
conn.commit()
print("done creating retailers")
c.execute("""
CREATE TABLE IF NOT EXISTS location (
  location_id int PRIMARY KEY,
  inventory_id int ,
  address text DEFAULT '' not null,
  FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
    );
""")
conn.commit()
print("done creating location")
c.execute("""
CREATE TABLE IF NOT EXISTS inventory (
    inventory_id int  PRIMARY KEY,
	location_id int,
  retailer_id int,
  FOREIGN KEY (location_id) REFERENCES location(location_id),
    FOREIGN KEY (retailer_id) REFERENCES retailers(retailer_id)

    );
""")
conn.commit()
print("done creating inventory")
c.execute("""
CREATE TABLE IF NOT EXISTS invoice (
  invoice_id int  PRIMARY KEY,
	customer_id int,
  order_id int,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)

    );
""")
print("done creating invoice")
conn.commit()
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
  c.execute("select * from users")
  users = c.fetchall()
  print(users)
  print("inserted query 1")
  if user_type == "customer":
    customer_id = user_id
    customer_details = (customer_id,user_id,name,email,contact,address,balance)
    query2 = "INSERT OR REPLACE INTO customers(customer_id,user_id,name,email,contact_no,address,balance) VALUES (?,?,?,?,?,?,?)" 
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


@app.route('/api/add2cart/cart_id=<int:cart_id>&cid=<string:customer_id>&pid=<int:product_id>&price=<float:price>&quantity=<int:quantity>')
def add2cart(cart_id,customer_id,product_id,price,quantity):
  conn = get_db()
  c = conn.cursor()
  import datetime
  tup = (cart_id,customer_id,product_id,quantity,price)
  print('add2cart',tup)
  query  = "INSERT OR REPLACE INTO cart(cart_id,customer_id,product_id,quantity,price) VALUES (?,?,?,?,?)"
  c.execute(query,tup)
  conn.commit()
  c.execute("select * from cart")
  cart_items = c.fetchall()
  print('cart-items',cart_items)
  conn.commit()
  conn.close()
  return "added to cart"
@app.route('/api/place_order/order_id=<int:order_id>&cart_id=<int:cart_id>&cid=<string:customer_id>&pid=<int:product_id>&price=<float:price>&quantity=<int:quantity>&total=<float:total>')
def place_order(order_id,cart_id,customer_id,product_id,price,quantity,total):
  conn = get_db()
  c = conn.cursor()
  import datetime
  created = datetime.datetime.now()
  status_modified = datetime.datetime.now()
  status = 'placed'
  tup = (order_id,cart_id,customer_id,product_id,status,created,status_modified,total)
  print('place_order',tup)
  query  = "INSERT OR REPLACE INTO orders(order_id,cart_id,customer_id,product_id,status,created,status_modified,total) VALUES (?,?,?,?,?,?,?,?)"
  c.execute(query,tup)
  conn.commit()
  c.execute("select * from orders")
  order_items = c.fetchall()
  print('order-items',order_items)
  conn.commit()
  conn.close()
  
  return "order_placed"



if __name__=="__main__":
  app.run(debug=True)
