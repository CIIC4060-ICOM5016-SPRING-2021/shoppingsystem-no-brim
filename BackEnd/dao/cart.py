from config.pg_config import pg_config
import psycopg2
from datetime import datetime, timezone


class CartDao:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getCart(self, user_id):
        query = "SELECT cart_item_id, quantity, product, user FROM cart_items WHERE user = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getAllCarts(self):
        query = "SELECT cart_item_id, quantity, product, user FROM cart_items;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def addCartItem(self, quantity, product_id, user_id):
        query = "INSERT INTO cart_items (quantity, product, user) VALUES (%s, %s, %s) returning cart_item_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (quantity, product_id, user_id,))
        product_id = cursor.fetchone()[0]
        self.conn.commit()
        return product_id

    def deleteCartItem(self, cart_item_id):
        query = "DELETE FROM cart_items WHERE cart_item_id = %s returning cart_item_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (cart_item_id,))
        result = cursor.fetchone()[0]
        self.conn.commit()
        return result

    def clearCartItems(self, user_id):
        query = "DELETE FROM cart_items WHERE user=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = user_id
        return result


