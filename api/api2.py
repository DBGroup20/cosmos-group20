from flask import Flask
import sqlite3
import json
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
print("inserting products and brands")
conn.commit()
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('0','oriflame');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('1','mac');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('2','loreal');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('0',(SELECT brand_id from brand WHERE brand_id='0'),'foundation ','10','1000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('1',(SELECT brand_id from brand WHERE brand_id='0'),'blush ','10','2000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('2',(SELECT brand_id from brand WHERE brand_id='0'),'lipstick ','10','3000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('3',(SELECT brand_id from brand WHERE brand_id='1'),'nailpolish ','10','500');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('4',(SELECT brand_id from brand WHERE brand_id='1'),'blush ','10','4000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('5',(SELECT brand_id from brand WHERE brand_id='1'),'lipstick ','10','3000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('6',(SELECT brand_id from brand WHERE brand_id='2'),'nailpolish ','10','1000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('7',(SELECT brand_id from brand WHERE brand_id='2'),'foundation ','10','4500');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('8',(SELECT brand_id from brand WHERE brand_id='2'),'lipstick ','10','3000');""")
conn.commit()


conn.close()
print("inserted products and brands")

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

@app.route('/api/products')
def search_product():
  conn = get_db()
  c = conn.cursor()
  c.execute("select * from product")
  products = c.fetchall()
  print(products)
  p=[]
  #product_id,brand_id,name,stock,price,image
  for i in range(len(products)):
    product = { "product_id": products[i][0],"brand_id":products[i][1],"name":products[i][2],"stock":products[i][3],"price":products[i][4],"image":products[i][5]}
    p.append(product)   
  all_products = json.dumps(p) 
  print("All products")
  conn.commit()
  conn.close()

  return all_products
@app.route('/api/ascendingprices')
def ascendingprices():
  conn = get_db()
  c = conn.cursor()
  c.execute("Select * from product order by price ASC;")
  rows = c.fetchall()
  print(rows)
  products = []
  for row in rows:
    product = { "product_id": row[0],"brand_id":row[1],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)  
   
  print(all_products)
  conn.commit()
  conn.close()
  print("ascending")
  return all_products
@app.route('/api/descendingprices')
def descendingprices():
  conn = get_db()
  c = conn.cursor()
  c.execute("Select * from product order by price DESC;")
  rows = c.fetchall()
  print(rows)
  products = []
  for row in rows:
    product = { "product_id": row[0],"brand_id":row[1],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)  
   
  print(all_products)
  conn.commit()
  conn.close()
  print("descending")
  return all_products  
@app.route('/api/searchbyname/name=<string:name>')
def searchbyname(name):
  #{ "product_id": row[0],"brand_id":row[1],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
  conn = get_db()
  c = conn.cursor()
  query = "SELECT * FROM product WHERE name = ?"
  c.execute(query,(name,))
  rows = c.fetchall()
  conn.commit()
  products = []
  for row in rows:
    product = { "product_id": row[0],"brand_id":row[1],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)    
  print("All products")
  conn.close()  
  return all_products  
 

@app.route('/api/searchbybrand/name=<string:name>')
def searchbybrand(name):
  conn = get_db()
  c = conn.cursor()
  query = "SELECT * FROM brand WHERE name = ?"
  c.execute(query,(name,))
  rows = c.fetchall()
  conn.commit()
  products = []
  for row in rows:
    product = { "brand_id": row[0],"name":row[1]}
    products.append(product)   
  all_products = json.dumps(products)    
  print("All products")
  conn.close()  
  return all_products  
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
  if cart_id ==None or customer_id == None or product_id == None or price == None or quantity==None:
    return "could not insert to cart for unlogged user"
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
  print("added to cart")
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
  print("order placed")
  return "order_placed"
@app.route('/api/payment/balance=<float:balance>&bill=<float:bill>')
def make_payment(balance,bill):
  conn = get_db()
  c = conn.cursor()
  if balance > bill:
    status = "paid"
  print("payment made")
  return "payment made"







if __name__=="__main__":
  app.run(debug=True)
