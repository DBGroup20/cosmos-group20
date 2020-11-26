import sqlite3
conn = sqlite3.connect("cosmos.db")
c = conn.cursor()
'''
c.execute( """
 CREATE TABLE IF NOT EXISTS orders (
    order_id int  PRIMARY KEY,
    customer_id text not null,
    cart_id int not null,
    product_id int not null,
    status text DEFAULT '' not null,
    status_modified datetime ,
    total REAL DEFAULT 0.0 not null,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
    );
"""
)

conn.commit()

c.execute("""
CREATE TABLE retailers (
    retailers_id int  PRIMARY KEY,
	brand_id int
    );
""")
'''
c.execute("select name from sqlite_master where type = 'table';")
conn.commit()
tables = c.fetchall()
print(tables)
tup = ('stupid','stupid','coward','nomail','callthepolice',"nomansland",1000)
# c.execute("INSERT OR REPLACE INTO customers(customer_id,user_id,names,email,contact_no,address,balance) VALUES (?,?,?,?,?,?,?)",tup )
c.execute("select * from customers")
customers = c.fetchall()
print(customers)
conn.commit()
conn.close()