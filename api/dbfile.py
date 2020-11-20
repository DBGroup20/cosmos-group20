import mysql.connector
from mysql.connector import errorcode
mydb = None
try:
  mydb = mysql.connector.connect(user='root',
                                host = '127.0.0.1',
                                password='root',
                                database="customer_db")
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
if mydb is not None:
  my_cursor = mydb.cursor()
  query = "SELECT username,password FROM customers WHERE username = '%s' AND password = '%s'" % ('talk11','123')
  print(query)
  my_cursor.execute(query)
  db_user_details = my_cursor.fetchone()
  print(db_user_details[0])
 

