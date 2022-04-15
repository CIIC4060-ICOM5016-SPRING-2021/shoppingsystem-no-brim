from flask import jsonify

from dao.product import ProductDAO
from controller.user import UserController


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

    def addNewProduct(self, json):
        name = json['Name']
        description = json['Description']
        price = json['Price']
        inventory = json['Inventory']
        categoryid = json['Category']
        user_id = json['User']

        user_controller = UserController()

        if not (user_controller.checkAdmin(user_id)):
            return "No Permission", 403

        dao = ProductDAO()
        id = dao.insertIntoProducts(name, description, price, inventory, categoryid)
        json['Id'] = id
        return jsonify(json), 201

    def updateProduct(self, product_id, json):
        price = json['Price']
        inventory = json['Inventory']
        user_id = json['User']

        user_controller = UserController()

        if not (user_controller.checkAdmin(user_id)):
            return "No Permission", 403

        dao = ProductDAO()
        updated = dao.updateProduct(product_id, price, inventory)
        if updated:
            return jsonify(json), 200
        else:
            return jsonify("Not Found"), 404

    def deleteProduct(self, product_id, json):
        dao = ProductDAO()
        user_id = json['User']

        user_controller = UserController()

        if not (user_controller.checkAdmin(user_id)):
            return "No Permission", 403

        result = dao.deleteProductById(product_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def getMostBoughtProdcut(self):
        dao = ProductDAO()
        product_id = dao.getMostBoughtProdcut()
        result = dao.getProductById(product_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def getMostLikedProdcut(self):
        dao = ProductDAO()
        product_id = dao.getMostLikedProdcut()
        result = dao.getProductById(product_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def getCheapestProduct(self):
        dao = ProductDAO()
        result = dao.getCheapestProduct()
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def getMostExpensiveProduct(self):
        dao = ProductDAO()
        result = dao.getMostExpensiveProduct()
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)