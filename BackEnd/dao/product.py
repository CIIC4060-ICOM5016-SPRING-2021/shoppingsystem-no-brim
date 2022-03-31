from config.pg_config import pg_config
import psycopg2


class ProductDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getAllProducts(self):
        query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                "products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id ;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getProductById(self, product_id):
        query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                "products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "WHERE products.product_id = '%s';"
        cursor = self.conn.cursor()
        cursor.execute(query, (product_id,))
        return cursor.fetchone()

    def getProductByPrice(self, order):
        if order == "ASC":
            query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                    "products.times_bought, products.likes, product_categories.name FROM products " \
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "ORDER BY products.price ASC;"
        elif order == "DESC":
            query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                    "products.times_bought, products.likes, product_categories.name FROM products " \
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "ORDER BY products.price DESC;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getProductByName(self, order):
        if order == "ASC":
            query = "SELECT products.product_id, products.name, products.description, products.price, " \
                    "products.inventory, products.times_bought, products.likes, product_categories.name FROM products "\
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "ORDER BY products.name ASC;"
        elif order == "DESC":
            query = "SELECT products.product_id, products.name, products.description, products.price, " \
                    "products.inventory, products.times_bought, products.likes, product_categories.name FROM products "\
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "ORDER BY products.name DESC;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def getProductsByCategory(self, category_id):
        query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                "products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "WHERE products.category = '%s';"
        cursor = self.conn.cursor()
        cursor.execute(query, (category_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result


