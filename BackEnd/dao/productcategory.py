from config.pg_config import pg_config
import psycopg2


class ProductCategoryDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getProductCategoryById(self, product_category_id):
        query = "SELECT pc.category_id, pc.name, pc.description FROM product_categories as pc WHERE pc.category_id = %s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (product_category_id, ))
        return cursor.fetchone()

    def getAllCategories(self):
        query = "SELECT category_id, name, description FROM product_categories;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        self.conn.close()
        return result

    def getMostBoughtCategory(self):
        query = "SELECT pc.category_id,pc.name, pc.description FROM ordered_items INNER JOIN " \
                "products p on p.product_id = ordered_items.product INNER JOIN product_categories pc on p.category = " \
                "pc.category_id GROUP BY pc.category_id,pc.name, pc.description ORDER BY SUM(ordered_items.quantity) " \
                "DESC;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        self.conn.close()
        return result

