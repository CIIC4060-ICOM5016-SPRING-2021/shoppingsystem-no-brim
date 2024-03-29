from config.pg_config import pg_config
import psycopg2
from datetime import datetime, timezone


class UserDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getAllUsers(self):
        query = 'SELECT user_id,username,password,first_name,last_name,phone,email,created_at,is_admin FROM "user";'
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getUserById(self, user_id):
        query = 'SELECT user_id,username,password,first_name,last_name,phone,email,created_at,is_admin FROM "user" WHERE user_id = %s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        return cursor.fetchone()

    def createUser(self, username, password, first_name, last_name, phone, email, is_admin):
        query = 'INSERT INTO "user" (username,password,first_name,last_name,phone,email,created_at,is_admin) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) returning user_id;'
        dt = datetime.now()
        cursor = self.conn.cursor()
        cursor.execute(query, (username, password, first_name, last_name, phone, email, dt, is_admin))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id

    def updateUser(self,user_id, username, password, first_name, last_name, phone, email, is_admin):
        query = 'UPDATE "user" SET username=%s,password=%s,first_name=%s,last_name=%s,phone=%s,email=%s,is_admin=%s WHERE user_id=%s'
        cursor = self.conn.cursor()
        cursor.execute(query, (username, password, first_name, last_name, phone, email, is_admin,user_id))
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0

    def deleteUserById(self, user_id):
        query = 'DELETE FROM "user" WHERE user_id = %s returning user_id;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))

        try:
            id = cursor.fetchone()[0]
        except:
            return

        self.conn.commit()
        return id

    # Need further testing
    def getRankMostBoughtCategory(self, user_id):
        query = 'SELECT pc.category_id, pc.name, pc.description, SUM(oi.quantity) FROM ordered_items as oi INNER JOIN products p on oi.product = p.product_id INNER JOIN product_categories pc on p.category = pc.category_id INNER JOIN orders o on oi."order" = o.order_id INNER JOIN "user" u on o."user" = u.user_id WHERE u.user_id = %s GROUP BY pc.category_id ORDER BY SUM(oi.quantity) DESC LIMIT 5;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        result = []
        for r in cursor:
            result.append(r)
        return result

    def getRankMostBoughtProdcut(self, user_id):
        query = 'SELECT p.product_id, p.name, p.description, p.price as price, p.inventory, p.name, SUM(oi.quantity) AS ammount FROM ordered_items as oi INNER JOIN products p on oi.product = p.product_id INNER JOIN product_categories pc on p.category = pc.category_id INNER JOIN orders o on oi."order" = o.order_id INNER JOIN "user" u on o."user" = u.user_id WHERE u.user_id = %s GROUP BY p.product_id ORDER BY SUM(oi.quantity) DESC LIMIT 5;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        result = []
        for r in cursor:
            result.append(r)
        return result        

    def getCheapestProduct(self, user_id):
        query = 'SELECT products.product_id, products.name, products.description, products.price as price, products.inventory, product_categories.name FROM products INNER JOIN product_categories ON products.category = product_categories.category_id INNER JOIN ordered_items on products.product_id = ordered_items.product INNER JOIN orders o on ordered_items.order = o.order_id INNER JOIN "user" u on o.user = u.user_id WHERE u.user_id = %s AND products.isactive = true ORDER BY price ASC;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        return cursor.fetchone()

    def getMostExpensiveProduct(self, user_id):
        query = 'SELECT products.product_id, products.name, products.description, products.price as price, products.inventory, product_categories.name FROM products INNER JOIN product_categories ON products.category = product_categories.category_id INNER JOIN ordered_items on products.product_id = ordered_items.product INNER JOIN orders o on ordered_items.order = o.order_id INNER JOIN "user" u on o.user = u.user_id WHERE u.user_id = %s AND products.isactive = true ORDER BY price DESC;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        return cursor.fetchone()

    def checkAdmin(self,user_id):
        query = 'SELECT is_admin FROM "user" WHERE user_id=%s ;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        result = cursor.fetchone()[0]
        return result

    def login(self, username, password):
        query = 'SELECT user_id FROM "user" WHERE username = %s AND password = %s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (username, password))
        try:
            result = cursor.fetchone()[0]
        except:
            return
        return result


