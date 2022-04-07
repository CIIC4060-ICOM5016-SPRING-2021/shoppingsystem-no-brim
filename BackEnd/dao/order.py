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
        query = "SELECT ordered_item_id, product, quantity, price, ordered_items.order FROM ordered_items " \
                "WHERE ordered_items.order = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getOrderById(self, order_id):
        query = "SELECT order_id, user, date_ordered, total_cost FROM orders WHERE order_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (order_id,))
        return cursor.fetchone()

    def getAllOrders(self):
        query = "SELECT order_id, user, date_ordered, total_cost FROM orders;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        self.conn.close()
        return result
