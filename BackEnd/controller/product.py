from flask import jsonify
from dao.product import ProductDAO


class ProductController:
    def build_dict(self, row):
        result = {'product_id': row[0], 'name': row[1], 'description': row[2], 'price': row[3],
                  'inventory': row[4], 'times_bought': row[5], 'likes': row[6], 'category': row[7]}
        return result

    def getAllProducts(self):
        dao = ProductDAO()
        result_t = dao.getAllProducts()

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def getProductById(self, product_id):
        dao = ProductDAO()
        result = dao.getProductById(product_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def getProductByPrice(self, order):
        if order != "ASC" and order != "DESC":
            return jsonify("Bad Request"), 400
        dao = ProductDAO()
        result_t = dao.getProductByPrice(order)
        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def getProductByName(self, order):
        if order != "ASC" and order != "DESC":
            return jsonify("Bad Request"), 400
        dao = ProductDAO()
        result_t = dao.getProductByName(order)
        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def getProductByCategory(self, category_id):
        dao = ProductDAO()
        result_t = dao.getProductsByCategory(category_id)

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)
        if not result:
            return jsonify("Not Found"), 404
        return jsonify(result)
