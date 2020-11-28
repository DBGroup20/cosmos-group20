import sqlite3
conn = sqlite3.connect("cosmos.db")
c = conn.cursor()

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