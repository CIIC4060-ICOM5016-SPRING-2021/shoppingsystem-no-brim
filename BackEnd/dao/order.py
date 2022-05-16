from config.pg_config import pg_config
import psycopg2
from datetime import datetime, timezone


class OrderDao:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getOrderItems(self, order_id):
        query = "SELECT ordered_item_id, product, quantity, ordered_items.price, ordered_items.order, p.name " \
                "FROM ordered_items INNER JOIN products p on p.product_id = ordered_items.product " \
                "WHERE ordered_items.order = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getOrderById(self, order_id):
        query = 'SELECT order_id, "user", date_ordered, total_cost FROM orders WHERE order_id = %s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        return cursor.fetchone()

    def getAllOrders(self):
        query = 'SELECT order_id, "user", date_ordered, total_cost FROM orders;'
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        self.conn.close()
        return result

    def getAllUserOrders(self, user_id):
        query = 'SELECT order_id, "user", date_ordered, total_cost FROM orders WHERE "user" = %s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, ))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        self.conn.close()
        return result

    def newOrder(self, user_id):
        query = 'INSERT INTO orders("user",date_ordered) VALUES (%s, %s) returning order_id'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id, datetime.now(), ))
        order_id = cursor.fetchone()[0]
        self.conn.commit()
        return order_id

    def getPrice(self, product_id):
        query1 = "SELECT price FROM products WHERE product_id = %s"
        cursor = self.conn.cursor()
        cursor.execute(query1, (product_id,))
        price = cursor.fetchone()[0]
        return price

    def getInventory(self, product_id):
        query1 = "SELECT inventory FROM products WHERE product_id = %s"
        cursor = self.conn.cursor()
        cursor.execute(query1, (product_id,))
        result = cursor.fetchone()[0]
        return result

    def newOrderItem(self, quantity, price,product_id, order_id):
        query = 'INSERT INTO ordered_items(quantity, price, "order", product) VALUES (%s, %s, %s, %s) returning ordered_item_id'
        cursor = self.conn.cursor()
        cursor.execute(query, (quantity, price, order_id, product_id, ))
        self.conn.commit()
        order_item_id = cursor.fetchone()[0]
        return order_item_id

    def deleteOrder(self, order_id):
        query = "DELETE FROM orders WHERE order_id = %s returning order_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        try:
            result = cursor.fetchone()[0]
        except:
            return
        self.conn.commit()
        return result

