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
        query = "SELECT user.user_id,user.username,user.password,user.first_name,user.last_name,user.phone,user.email" \
                "FROM user;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getUserById(self, user_id):
        query = "SELECT user.user_id,user.username,user.password,user.first_name,user_last_name,user.phone,user.email" \
                "FROM user " \
                "WHERE user.user_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        return cursor.fetchone()

    def createUser(self, username, password, first_name, last_name, phone, email, is_admin):
        query = "INSERT INTO user (username,password,first_name,last_name,phone,email,created_at,is_admin)" \
                "VALUES (%s,%s,%s,%s,%s,%s,%s) returning user_id;"
        dt = datetime.now()
        cursor = self.conn.cursor()
        cursor.execute(query, (username, password, first_name, last_name, phone, email, dt, is_admin))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id

    def updateUser(self, user_id, username, password, first_name, last_name, phone, email, is_admin):
        query = "UPDATE user SET user_id=%s, username=%s,password=%s,first_name=%s,last_name=%s,phone=%s,email=%s,is_admin=%s" \
                "WHERE user.user_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, username, password, first_name, last_name, phone, email, is_admin))
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0

    def deleteUserById(self, user_id):
        query = "DELETE FROM user" \
                "WHERE user.user_id = %s returning user_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id))
        id = cursor.fetchone()[0]
        self.conn.commit()
        return id

    def getMostBoughtCategory(self, user_id):
        query = "SELECT u.user_id, pc.category_id,pc.name, pc.description FROM ordered_items INNER JOIN " \
                "products p on p.product_id = ordered_items.product INNER JOIN product_categories pc on p.category = " \
                "INNER JOIN orders o on ordered_items.order = o.order_id " \
                "INNER JOIN user u on o.user = u.user_id " \
                "pc.category_id GROUP BY pc.category_id,pc.name, pc.description ORDER BY SUM(ordered_items.quantity) " \
                "DESC LIMIT 1 " \
                "WHERE u.user_id = %s;" 
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = cursor.fetchone()
        return result

    # Maybe have to add more product info?
    def getMostBoughtProdcut(self, user_id):
        query = "SELECT u.user_id, product FROM ordered_items " \
                "INNER JOIN orders o on ordered_items.order = o.order_id " \
                "INNER JOIN user u on o.user = u.user_id " \
                "GROUP BY product ORDER BY SUM(quantity) DESC LIMIT 1 " \
                "WHERE u.user_id = %s;" 
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchone()[0]

    def getCheapestProduct(self, user_id):
        query = "SELECT u.user_id, products.product_id, products.name, products.description, products.price as price, " \
                "products.inventory, products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "INNER JOIN orders o on ordered_items.order = o.order_id " \
                "INNER JOIN user u on o.user = u.user_id " \
                "ORDER BY price ASC " \
                "WHERE u.user_id = %s;" 
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchone()

    def getMostExpensiveProduct(self, user_id):
        query = "SELECT u.user_id, products.product_id, products.name, products.description, products.price as price, " \
                "products.inventory, products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "INNER JOIN orders o on ordered_items.order = o.order_id " \
                "INNER JOIN user u on o.user = u.user_id " \
                "ORDER BY price DESC " \
                "WHERE u.user_id = %s;" 
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchone()

    def checkAdmin(self,user_id):
        query = 'SELECT is_admin FROM "user" WHERE user_id=%s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id))
        result = cursor.fetchone()[0]
        return result

