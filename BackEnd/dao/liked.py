from config.pg_config import pg_config
import psycopg2
from datetime import datetime, timezone

class LikedDao:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getLikes(self, user_id):
        query = 'SELECT liked_item_id, product, "user" FROM liked_items WHERE "user" = %s;'
        cursor = self.conn.cursor()
        cursor.execute(query, (user_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getAllLikes(self):
        query = 'SELECT liked_item_id, product, "user" FROM liked_items;'
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def addLikedItem(self,product_id, user_id):
        query = 'INSERT INTO liked_items (product, "user") VALUES (%s, %s) returning liked_item_id;'
        cursor = self.conn.cursor()
        cursor.execute(query, (product_id, user_id,))
        product_id = cursor.fetchone()[0]
        self.conn.commit()
        self.conn.close()
        return product_id

    def deleteLikedItem(self, liked_item_id):
        query = "DELETE FROM liked_items WHERE liked_item_id = %s returning liked_item_id;"
        cursor = self.conn.cursor()
        cursor.execute(query, (liked_item_id,))
        try:
            result = cursor.fetchone()[0]
        except:
            return
        self.conn.commit()
        return result
