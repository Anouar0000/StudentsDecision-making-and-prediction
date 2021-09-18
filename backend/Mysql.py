import sqlite3

conn = sqlite3.connect('db.sqlite3')

c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS api_task (
id INTEGER PRIMARY KEY,
firstname TEXT NOT NULL,
lastname TEXT NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL,
conect TEXT NOT NULL
);''')


#c.execute('INSERT INTO api_task (firstname, lastname, email, password, conect) VALUES (?,?,?,?,?)',
#          ('admin', 'admin', 'admin@admin.com', 'admin', 'no'))
c.execute('DELETE FROM api_task WHERE firstname="anouar";')
print(list(conn.execute("SELECT * FROM api_task")))
conn.commit()
conn.close()