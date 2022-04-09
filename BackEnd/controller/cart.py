from flask import jsonify
from dao.cart import CartDao


class CartController:

    def build_order_dict(self, row):
        result = {'cart_item_id': row[0], 'quantity': row[1], 'product_id': row[2], 'user_id': row[3]}
        return result

    def getCart(self, json):
        dao = CartDao()
        user_id = json["User"]
        result_t = dao.getCart(user_id)

        result = []
        for r in result_t:
            result.append(self.build_order_item_dict(r))

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

    def removeCartItem(self, json):
        dao = CartDao()
        cart_item_id = json["Cart Item"]
        result = dao.deleteCartItem(cart_item_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)

    def clearCartItems(self, json):
        dao = CartDao()
        user_id = json["User"]
        result = dao.clearCartItems(user_id)
        return jsonify(json)
