import os 
import sqlite3

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
# print(user_query)
conn = sqlite3.connect("cosmos_test2.db")
c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS brand (
brand_id int PRIMARY KEY ,
name text DEFAULT '' not null
);""")
conn.commit()
print("done creating brand")
c.execute(brand_query)
conn.commit()

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
c.execute(product_query)
conn.commit()
c.execute("SELECT * from product")
products = c.fetchall()
conn.commit()
c.execute("SELECT * from brand")
brands =  c.fetchall()
conn.commit()
print("fetched products")
print(products)
print("fetched brands")
print(brands)

