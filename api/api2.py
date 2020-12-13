from flask import Flask
import sqlite3
import json
from flask_cors import CORS, cross_origin
from flask import g
from flask import jsonify,send_from_directory
from flask import request
import os
import base64
DATABASE = 'cosmos3.db'


base_dir = os.getcwd()
brand_path = base_dir + "/brand.txt"
product_path = base_dir +"/product.txt"


brand_query = ""
product_query= ""
dummy = ""
with open(brand_path,"r") as f:
    brand_query_lines = f.readlines()
    for line in brand_query_lines:
        brand_query = brand_query + line.strip()
with open(product_path,"r") as f:
    product_query_lines = f.readlines()
    for line in product_query_lines:
        product_query = product_query + line.strip()


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db
app =  Flask (__name__,static_folder='./build',static_url_path='')
cors = CORS(app)
conn = sqlite3.connect("cosmos3.db")
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
CREATE TABLE IF NOT EXISTS admin (
  admin_id text PRIMARY KEY,
	user_id text,
    name text  not null,
    email text DEFAULT '' not null,
    role text DEFAULT '' not null,
    contact_no text DEFAULT '' not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
) ;""")
conn.commit()
print("done creating admin")

print("creating customers")
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
brand_id int PRIMARY KEY ,
name text DEFAULT '' not null
);""")
conn.commit()
print("done creating brand")

c.execute("""
CREATE TABLE IF NOT EXISTS product (
    product_id int PRIMARY KEY,
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
    quantity int not null,
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
CREATE TABLE IF NOT EXISTS inventory (
  inventory_id int  PRIMARY KEY ,
  address text DEFAULT '' not null,
  contact_no text DEFAULT '' not null,
  manager text DEFAULT '' not null,
  brand_id int,
  FOREIGN KEY (brand_id) REFERENCES brand(brand_id)
    );
""")
conn.commit()
print("done creating inventory")

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
print("inserting products and brands from file")
conn.commit()
print("inserting products and brands")
print("inserting products and brands")
'''
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('0','oriflame');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('1','mac');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO brand(brand_id, name) values('2','loreal');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('0',(SELECT brand_id from brand WHERE brand_id='0'),'foundation','10','1000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('1',(SELECT brand_id from brand WHERE brand_id='0'),'blush','10','2000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('2',(SELECT brand_id from brand WHERE brand_id='0'),'lipstick','10','3000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('3',(SELECT brand_id from brand WHERE brand_id='1'),'nailpolish','10','500');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('4',(SELECT brand_id from brand WHERE brand_id='1'),'blush','10','4000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('5',(SELECT brand_id from brand WHERE brand_id='1'),'lipstick','10','3000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('6',(SELECT brand_id from brand WHERE brand_id='2'),'nailpolish','10','1000');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('7',(SELECT brand_id from brand WHERE brand_id='2'),'foundation','10','4500');""")
conn.commit()
c.execute("""INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values('8',(SELECT brand_id from brand WHERE brand_id='2'),'lipstick','10','3000');""")
conn.commit()
'''
c.execute(product_query)
conn.commit()

c.execute(brand_query)
conn.commit()

print("inserted products and brands from file")
conn.close()

@app.route('/')
def hello():
  print("in here ")
  return app.send_static_file('index.html')


@app.route('/api/user=<string:cid>/balance')
@cross_origin()
def getUserBalance(cid):
  conn = get_db()
  c = conn.cursor()
  query1="select balance from customers where customer_id=?"
  c.execute(query1,(cid,))
  balance = c.fetchone()
  balance=balance[0]
  msg = json.dumps({"balance":balance})
  return msg

@app.route('/api/signup/username=<string:username>&name=<string:name>&pwd=<string:password>&user_type=<string:user_type>&role=<string:role>&contact=<string:contact>&address=<string:address>&email=<string:email>&balance=<int:balance>')
@cross_origin()
def signup(username,name,password,user_type,role,contact,address,email,balance):
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
  if user_type == "admin":
    admin_id = user_id
    admin_details = (admin_id,user_id,name,email,contact,role)
    query2 = "INSERT OR REPLACE INTO admin(admin_id,user_id,name,email,contact_no,role) VALUES (?,?,?,?,?,?)" 
    c.execute(query2,admin_details)
    conn.commit()
    c.execute("select * from admin")
    admins = c.fetchall()
    print(admins)
    print("inserted query 2")
  conn.close()
  return "You have registered at our website!"

@app.route('/api/products')
@cross_origin()
def search_product():
  conn = get_db()
  c = conn.cursor()
  c.execute("select * from product inner join brand on product.brand_id=brand.brand_id ")
  products = c.fetchall()
  p=[]
  for i in range(len(products)):
    product = { "product_id": products[i][0],"brand_id":products[i][1],"brand_name":products[i][7],"name":products[i][2],"stock":products[i][3],"price":products[i][4],"image":products[i][5]}
    p.append(product)   
  all_products = json.dumps(p) 
  print("All products")
  conn.commit()
  conn.close()
  return all_products
@app.route('/api/ascendingprices/name=<string:name>&price=<int:price>')
@cross_origin()
def ascendingprices(name,price):
  conn = get_db()
  c = conn.cursor()
  c.execute("Select * from product inner join brand on product.brand_id=brand.brand_id order by price ASC;")
  rows = c.fetchall()
  print(rows)
  products = []
  for row in rows:
    if row[4] <= price and row[2] == name:
      product = { "product_id": row[0],"brand_id":row[1],"brand_name":row[7],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
      products.append(product)   
  all_products = json.dumps(products)  
   
  print("all_products by price <=",price,all_products)
  conn.commit()
  conn.close()
  print("ascending")
  return all_products
@app.route('/api/descendingprices')
@cross_origin()
def descendingprices():
  conn = get_db()
  c = conn.cursor()
  c.execute("Select * from product inner join brand on product.brand_id=brand.brand_id order by price DESC;")
  rows = c.fetchall()
  print(rows)
  products = []
  for row in rows:
    product = { "product_id": row[0],"brand_id":row[1],"brand_name":row[7],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)  
   
  print("descending by price",all_products)
  conn.commit()
  conn.close()
  print("descending")
  return all_products  
@app.route('/api/searchbyname/name=<string:name>')
@cross_origin()
def searchbyname(name):
  conn = get_db()
  c = conn.cursor()
  query = "select * from product inner join brand on product.brand_id=brand.brand_id where product.name = ?"
  c.execute(query,(name,))
  rows = c.fetchall()
  print(rows)
  conn.commit()
  products = []
  for row in rows:
    product = {"product_id": row[0],"brand_id":row[1],"brand_name":row[7],"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)    
  print("All products by name ",all_products)
  conn.close()  
  return all_products  
 

@app.route('/api/searchbybrand/name=<string:name>')
@cross_origin()
def searchbybrand(name):
  conn = get_db()
  c = conn.cursor()
  query = "SELECT brand_id FROM brand WHERE name = ?"
  c.execute(query,(name,))
  brand = c.fetchone()
  print(brand)
  conn.commit()
  query = "SELECT * FROM product WHERE brand_id = ?"
  c.execute(query,(brand[0],))
  b=brand[0]
  rows = c.fetchall()
  print(rows)
  conn.commit()
  products = []
  for row in rows:
    product = {"product_id": row[0],"brand_id":row[1],"brand_name":name,"name":row[2],"stock":row[3],"price":row[4],"image":row[5]}
    products.append(product)   
  all_products = json.dumps(products)    
  print("All products by name ",all_products)
  return all_products
@app.route('/api/login/username=<string:username>&pwd=<string:password>&user_type<string:user_type>')
@cross_origin()
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


@app.route('/api/add2cart/cart_id=<int:cart_id>&cid=<string:customer_id>&pid=<int:product_id>&price=<int:price>&quantity=<int:quantity>')
@cross_origin()
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
@app.route('/api/order/get-id')
@cross_origin()
def get_order_id():
  conn = get_db()
  c = conn.cursor()
  query = "SELECT * FROM orders ORDER BY order_id DESC LIMIT 1;"
  c.execute(query)
  orders = c.fetchone()
  conn.commit()
  print("order_id")
  order_id =  1
  if orders is None:
    order_id =  1
  else:
    order_id = orders[0] + 1
  conn.close()
  
  order_details = json.dumps(order_id)
  return order_details

@app.route('/api/place_order/order_id=<int:order_id>&cart_id=<int:cart_id>&cid=<string:customer_id>&pid=<int:product_id>&price=<int:price>&quantity=<int:quantity>&total=<int:total>')
@cross_origin()
def place_order(order_id,cart_id,customer_id,product_id,price,quantity,total):
  conn = get_db()
  c = conn.cursor()
  import datetime
  created = datetime.datetime.now()
  status_modified = datetime.datetime.now()
  status = 'placed'
  tup = (order_id,cart_id,customer_id,quantity,product_id,status,created,status_modified,total)
  print('place_order',tup)
  query  = "INSERT OR REPLACE INTO orders(order_id,cart_id,customer_id,quantity,product_id,status,created,status_modified,total) VALUES (?,?,?,?,?,?,?,?,?)"
  c.execute(query,tup)
  conn.commit()
  c.execute("select * from orders")
  order_items = c.fetchall()
  print('order-items',order_items)
  conn.commit()
  conn.close()
  print("order placed")
  return "order_placed"
@app.route('/api/payment/bill=<int:bill>&order_id=<int:order_id>&customer_id=<string:customer_id>')
@cross_origin()
def make_payment(bill,order_id,customer_id):

  conn = get_db()
  c = conn.cursor()
  query1="select balance from customers where customer_id=?"
  c.execute(query1,(customer_id,))
  balance = c.fetchone()
  balance=balance[0]
  print(balance)
  conn.commit()
  if balance >= bill:
    balance=balance-bill
    log="payment made"
  else:
    log="You don't have enough balance!"
  query="UPDATE customers SET balance = ? WHERE customer_id=?"
  c.execute(query,(balance,customer_id))
  conn.commit()

  conn.close()
  msg = {"msg":log}
  msg = json.dumps(msg)
  return msg

@app.route("/api/orders/uid=<string:user_id>")
@cross_origin()
def user_view_order_details(user_id):
  conn = get_db()
  c=conn.cursor()
  query1="select * from orders where customer_id=?"
  c.execute(query1,(user_id,))
  orders = c.fetchall()
  conn.commit()
  conn.close()
  print("users_orders:", orders)
  order_details = json.dumps(orders)
  return order_details

@app.route('/api/products/add/name=<string:name>&pid=<int:pid>&bname=<string:brand_name>&bid=<int:bid>&stock=<int:stock>&price=<int:price>', methods = ['POST'])
@cross_origin()
def admin_add_product(name,pid,brand_name,bid,stock,price):
  f = request.files['file']
  print("file uploaded is:",f)
  conn = get_db()
  c=conn.cursor()
  query = "INSERT OR REPLACE INTO brand(name,brand_id) values(?,?)"
  c.execute(query,(brand_name,bid))
  conn.commit()
  query = "SELECT brand_id FROM brand WHERE name = ?"
  c.execute(query,(brand_name,))
  brand_id = c.fetchall()
  conn.commit()
  query1="INSERT OR REPLACE INTO product(product_id,brand_id,name,stock,price) values(?,?,?,?,?)"
  c.execute(query1,(pid,bid,name,stock,price,))
  conn.commit()
  query = "select * from product"
  c.execute(query)
  products = c.fetchall()
  conn.commit()
  print("admin added and all products are",products) 
  conn.close()
  return jsonify(msg="product_added")
#/api/products/update/name=foundation&brand=oriflame&new_price=1500
@app.route('/api/products/update/name=<string:name>&brand=<string:brand>&new_price=<int:new_price>')
@cross_origin()
def admin_update_price(name,brand,new_price):
  print("trying to update price")
  conn = get_db()
  c=conn.cursor()
  query = "SELECT brand_id FROM brand WHERE name = ?"
  c.execute(query,(brand,))
  brand_id = c.fetchall()
  conn.commit()
  query1="UPDATE product SET price= ? WHERE brand_id=? AND name=?"
  c.execute(query1,(new_price,brand_id[0][0],name,))
  conn.commit()
  conn.close()
  msg = json.dumps({"msg":"price_updated"})
  return msg
@app.route('/api/order/update/status=<string:status>&order_id=<int:order_id>')
@cross_origin()
def admin_update_status(status,order_id):
  conn = get_db()
  c=conn.cursor()
  status_modified = datetime.datetime.now()
  query1="UPDATE orders SET status= ?, status_modified=? WHERE order_id=? "
  c.execute(query1,(status,status_modified,order_id,))
  conn.commit()
  conn.close()
  updated = {"mesg": "updated"}
  updated = json.dumps(updated)
  return updated
@app.route('/api/products/delete/pname=<string:pname>&pid=<string:pid>')
@cross_origin()
def admin_delete_product(pid,pname):
  conn = get_db()
  c=conn.cursor()
  c.execute("select * from product")
  users = c.fetchall()
  conn.commit()
  print(len(users))
  print(users)
  conn.commit()
  query1="DELETE FROM product WHERE product_id = ? AND name = ?;"
  c.execute(query1,(pid,pname))
  conn.commit()
  c.execute("select * from product")
  users = c.fetchall()
  conn.commit()
  print(len(users))
  print(users)
  conn.close()
  return jsonify(msg="product_deleted") 
@app.route('/api/addretailer/name=<string:name>&brand=<string:brand>&contact_no=<string:contact_no>')
@cross_origin()
def admin_retailer(name):
  conn = get_db()
  c=conn.cursor()  
  query1="INSERT OR REPLACE INTO brand(name) values(?)"
  c.execute(query1,(name,))
  conn.commit()
  conn.close()
  return 'added retailer'  

@app.route('/api/addwarehouse/address=<string:adress>&manager=<string:manager>&contact_no=<string:contact_no>&brand=<string:brand>')
@cross_origin()
def admin_add_warehouse(address,contact_no,manager,brand):
  conn = get_db()
  c=conn.cursor()
  query = "SELECT brand_id FROM brand WHERE name = ?"
  c.execute(query,(brand,))
  brand_id = c.fetchall()
  brand_id=brand_id[0][0]

  conn.commit()
  query1="INSERT OR REPLACE INTO inventory(address,contact_no,manager,brand_id) values(?,?,?,?)"
  c.execute(query1,(address,contact_no,manager,brand_id,))

  conn.commit()
  query1="select * from invertory"
  c.execute(query1)
  x=c.fetchall()
  print(x)
  conn.close()

  return 'added warehouse'  
  

@app.route('/api/brand/add/name=<string:name>')
@cross_origin()
def admin_add_brand(name):
  conn = get_db()
  c=conn.cursor()
  query1="INSERT OR REPLACE INTO brand(name) values(?)"
  c.execute(query1,(name,))
  conn.commit()
  conn.close()
  return 'added brand'
@app.route('/api/viewstatus/')
@cross_origin()
def admin_view_status():
  conn = get_db()
  c=conn.cursor()
  query1="select order_id, status from orders"
  c.execute(query1)
  orders = c.fetchall()
  print("AdminOrder",orders)
  conn.commit()
  products=[]
  for order in orders:
    product = {"order_id": order[0],"status":order[1]}
    products.append(product)   
  all_products = json.dumps(products)    
  print("All products by name ",all_products)
  conn.close() 
  return all_products

@app.route('/api/vieworderdetails/order_id=<int:order_id>')
@cross_origin()
def admin_view_order_details(order_id):
  conn = get_db()
  c=conn.cursor()
  query1="select * from orders where order_id=?"
  c.execute(query1,(order_id,))
  details = c.fetchall()
  print("order_details",details)
  order_id = details[0][0]
  user_id = details[0][1]
  cart_id = details[0][2]
  quantity = details[0][4]
  product_id = details[0][3]
  status = details[0][5]
  total = details[0][-1]
  conn.commit()
  query2 ="select * from product where product_id = ?"
  c.execute(query2,(product_id,))
  row = c.fetchone()
  print("order_product",row)
  brand_id = row[1]
  query3 = "select * from brand where brand_id = ?"
  c.execute(query3,(brand_id,))
  brand_details = c.fetchone()
  brand_name = brand_details[1]
  product_details = {"order_id":order_id,"user_id":user_id,"cart_id":cart_id,"product_id": product_id,"brand_id":row[1],"brand_name":brand_name,"name":row[2],"stock":row[3],"price":row[4],"image":row[5],"quantity":quantity,"status": status,"total":total}  
  print('product_details:',product_details)
  conn.commit()
  conn.close()
  details = json.dumps(product_details)
  # details = json.dumps(details)
  return details

@app.route('/api/stock/update/name=<string:name>&brand=<string:brand>&new_stock=<int:new_stock>')
@cross_origin()
def update_stock(name,brand,new_stock):
  conn = get_db()
  c=conn.cursor()
  query = "SELECT brand_id FROM brand WHERE name = ?"
  c.execute(query,(brand,))
  brand_id = c.fetchall()
  conn.commit()
  query1="UPDATE product SET stock= ? WHERE brand_id=? AND name=?"
  c.execute(query1,(new_stock,brand_id[0][0],name,))
  conn.commit()
  conn.close()
  msg = json.dumps({"msg":"stock_updated"})
  return msg

@app.route('/api/orderstatus/order_id=<int:order_id>')
@cross_origin()
def user_view_status(order_id):
  conn = get_db()
  c=conn.cursor()
  query1="select status from orders where order_id=?"
  c.execute(query1,(order_id,))
  details = c.fetchone()
  print(details[0])
  conn.commit()
  x=[]
  status={"status":details[0]}
  x.append(status)
  print(status)
  print(x)
  json_status=json.dumps(x)
  conn.close()
  return json_status
if __name__=="__main__":
  app.run(debug=True)
