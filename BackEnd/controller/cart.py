from flask import jsonify
from dao.cart import CartDao


class CartController:

    def build_dict(self, row):
        result = {'cart_item_id': row[0], 'quantity': row[1], 'product_id': row[2], 'user_id': row[3], 'products_name': row[4], 'products_description': row[5], 'products_price': row[6]}
        return result

    def getCart(self, user_id):
        dao = CartDao()

        result_t = dao.getCart(user_id)

        result = []
        for r in result_t:
            result.append(self.build_dict(r))
        return jsonify(result)
    def getAllCarts(self):
        dao = CartDao()
        result_t = dao.getAllCarts()

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def addCartItem(self, json):
        quantity = json['Quantity']
        product_id = json['Product']
        user_id = json['User']
        dao = CartDao()
        id = dao.addCartItem(quantity, product_id, user_id)
        json['Id'] = id
        return jsonify(json), 201

    def removeCartItem(self, cart_item_id):
        dao = CartDao()
        result = dao.deleteCartItem(cart_item_id)
        if not result:
            return jsonify("Not Found"), 404


        return jsonify(result)

    def clearCartItems(self, user_id):
        dao = CartDao()
        result = dao.clearCartItems(user_id)
        return jsonify(user_id)

    def updateCart(self, cart_item_id, json):
        quantity = json['Quantity']
        dao = CartDao()
        updated = dao.updateCartItem(quantity, cart_item_id)
        if updated:
            return jsonify(json), 200
        else:
            return jsonify("Not Found"), 40
