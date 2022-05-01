from flask import jsonify
from dao.liked import LikedDao

class LikedController:
    def build_dict(self, row):
        result = {'liked_item_id': row[0], 'product_id': row[1], 'user_id': row[2], 'products_name': row[3], 'products_description': row[4], 'products_price': row[5]}
        return result

    def getLikes(self, user_id):
        dao = LikedDao()
        result_t = dao.getLikes(user_id)

        result = []
        for r in result_t:
            result.append(self.build_dict(r))
        return jsonify(result)

    def getAllLikes(self):
        dao = LikedDao()
        result_t = dao.getAllLikes()

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def addLikedItem(self, json):
        product_id = json['Product']
        user_id = json['User']
        dao = LikedDao()
        id = dao.addLikedItem(product_id, user_id)
        json['Id'] = id
        return jsonify(json), 201

    def removeLikedItem(self, liked_item_id):
        dao = LikedDao()
        result = dao.deleteLikedItem(liked_item_id)
        if not result:
            return jsonify("Not Found"), 404

        return jsonify(liked_item_id)
