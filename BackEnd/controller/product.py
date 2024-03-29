from flask import jsonify

from dao.product import ProductDAO
from controller.user import UserController


class ProductController:
    def build_dict(self, row):
        result = {'product_id': row[0], 'name': row[1], 'description': row[2], 'price': row[3],
                  'inventory': row[4], 'category': row[5]}
        return result

    def build_dict_ammount(self,row):
        result = {'product_id': row[0], 'name': row[1], 'description': row[2], 'price': row[3],
                  'inventory': row[4], 'category': row[5], 'ammount': row[6]}
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

        d = self.getProductById(result)
        return jsonify(result)

    def getMostBoughtProduct(self):
        dao = ProductDAO()
        result_t = dao.getMostBoughtProduct()
        if not result_t:
            return jsonify("Not Found"), 404

        result = []
        for r in result_t:
            row = dao.getProductById(r[0])
            row = row + tuple([r[1]])
            d = self.build_dict_ammount(row)
            result.append(d)

        return jsonify(result)

    def getMostLikedProduct(self):
        dao = ProductDAO()
        r = dao.getMostLikedProduct()
        result = dao.getProductById(r[0])
        if not result:
            return jsonify("Not Found"), 404
        result = result + tuple([r[1]])
        d = self.build_dict_ammount(result)
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