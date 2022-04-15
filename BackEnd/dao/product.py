from config.pg_config import pg_config
import psycopg2
from datetime import datetime, timezone


class ProductDAO:
    def __init__(self):
        connection_url = "dbname=%s user=%s password=%s port=%s host=%s" % (
            pg_config['dbname'], pg_config['user'], pg_config['password'],
            pg_config['port'], pg_config['host'])

        self.conn = psycopg2.connect(connection_url)

    def getAllProducts(self):
        query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                "products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "WHERE products.isactive = true ;"
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
                "WHERE products.product_id = '%s' AND products.isactive = true ;"
        cursor = self.conn.cursor()
        cursor.execute(query, (product_id,))
        return cursor.fetchone()

    def getProductByPrice(self, order):
        if order == "ASC":
            query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                    "products.times_bought, products.likes, product_categories.name FROM products " \
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "WHERE products.isactive = true" \
                    "ORDER BY products.price ASC ;"
        elif order == "DESC":
            query = "SELECT products.product_id, products.name, products.description, products.price, products.inventory, " \
                    "products.times_bought, products.likes, product_categories.name FROM products " \
                    "INNER JOIN product_categories ON products.category = product_categories.category_id  " \
                    "WHERE products.isactive = true" \
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
                    "WHERE products.isactive = true" \
                    "ORDER BY products.name ASC;"
        elif order == "DESC":
            query = "SELECT products.product_id, products.name, products.description, products.price, " \
                    "products.inventory, products.times_bought, products.likes, product_categories.name FROM products "\
                    "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                    "WHERE products.isactive = true " \
                    "ORDER BY products.name DESC ;"
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
                "WHERE products.category = '%s' AND products.isactive = true;;"
        cursor = self.conn.cursor()
        cursor.execute(query, (category_id,))
        result = []
        for r in cursor:
            result.append(r)
        cursor.close()
        return result

    def insertIntoProducts(self, name, description, price, inventory, categoryid):
        query = "INSERT INTO products (name, description, price, inventory, category, times_bought, likes, " \
                "created_at) VALUES (%s ,%s ,%s ,%s ,%s ,%s ,%s, %s) returning product_id;"
        dt = datetime.now()
        cursor = self.conn.cursor()
        cursor.execute(query, (name, description, price, inventory, categoryid, 0, 0, dt,))
        product_id = cursor.fetchone()[0]
        self.conn.commit()
        return product_id

    def updateProduct(self, product_id, price, inventory):
        query = "UPDATE products SET price=%s, inventory=%s WHERE product_id=%s;"
        cursor = self.conn.cursor()
        cursor.execute(query, (price, inventory, product_id,))
        rowcount = cursor.rowcount
        self.conn.commit()
        return rowcount != 0

    def deleteProductById(self, product_id):
        query = "UPDATE products SET 'isActive'=false WHERE product_id=%s"
        cursor = self.conn.cursor()
        cursor.execute(query, (product_id,))
        id = cursor.fetchone()[0]
        self.conn.commit()
        return id

    def getMostBoughtProdcut(self):
        query = "SELECT ordered_items.product FROM ordered_items INNER JOIN products p on p.product_id = " \
                "ordered_items.product WHERE p.isactive GROUP BY ordered_items.product ORDER BY SUM(quantity) " \
                "DESC LIMIT 1;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchone()[0]

    def getMostLikedProdcut(self):
        query = "SELECT liked_items.product FROM liked_items INNER JOIN products p on p.product_id = liked_items.product" \
                " WHERE p.isactive = true GROUP BY product ORDER BY COUNT(liked_item_id) DESC LIMIT 1;"
        cursor = self.conn.cursor()
        cursor.execute(query)
        return cursor.fetchone()[0]

    def getCheapestProduct(self):
        query = "SELECT products.product_id, products.name, products.description, products.price as price, " \
                "products.inventory, products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "ORDER BY products.price ASC;"
        cursor = self.conn.cursor()
        cursor.execute(query,)
        return cursor.fetchone()

    def getMostExpensiveProduct(self):
        query = "SELECT products.product_id, products.name, products.description, products.price as price, " \
                "products.inventory, products.times_bought, products.likes, product_categories.name FROM products " \
                "INNER JOIN product_categories ON products.category = product_categories.category_id " \
                "WHERE products.isactive = true;" \
                " BY products.price DESC;"
        cursor = self.conn.cursor()
        cursor.execute(query,)
        return cursor.fetchone()

