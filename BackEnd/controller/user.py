from flask import jsonify
from dao.user import UserDAO

class UserController:

    def build_dict(self,row):
        result = {'user_id': row[0],'username':row[1], 'password': row[2],'first_name':row[3],'last_name': row[4],
                  'phone': row[5],'email': row[6], 'created_at' : row[7], 'is_admin': row[8]}
        return result

    def getAllUsers(self):
        dao = UserDAO()
        result_t = dao.getAllUsers()

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)

    def getUserById(self,user_id):
        dao = UserDAO()
        result = dao.getUserById(user_id)
        if not result:
            return jsonify("Not Found"), 404

        return jsonify(self.build_dict(result))


    def addNewUser(self,json):
        username = json['username']
        password = json['password']
        first_name = json['first_name']
        last_name = json['last_name']
        phone = json['phone']
        email = json['email']
        is_admin = json['is_admin']

        dao = UserDAO()
        id = dao.createUser(username,password, first_name, last_name, phone, email, is_admin)
        json['Id'] = id
        return jsonify(json), 201

    def updateUser(self,user_id,json):
        username = json['username']
        password = json['password']
        first_name = json['first_name']
        last_name = json['last_name']
        phone = json['phone']
        email = json['email']
        is_admin = json['is_admin']

        dao = UserDAO()
        updated = dao.updateUser(user_id,username, password, first_name, last_name,phone, email, is_admin)
        if updated:
            return jsonify(json),200
        else:
            return jsonify("Not Found"), 404




    def deleteUserById(self,user_id):
        dao = UserDAO()
        result = dao.deleteUserById(user_id)
        if not result:
            return jsonify("Not Found"), 404

        return result

        # User statistics

    def getMostBoughtCategory(self, user_id):
        dao = UserDAO()
        result = dao.getMostBoughtCategory(user_id)
        if not result:
            return jsonify("Not Found"), 404
        d = self.build_dict(result)
        return jsonify(d)

    def getMostBoughtProdcut(self, user_id):
        dao = UserDAO()
        result = dao.getMostBoughtProdcut(user_id)
        if not result:
            return jsonify("Not Found"), 404
        d = self.build_dict(result)
        return jsonify(d)

    def getCheapestProduct(self, user_id):
        dao = UserDAO()
        result = dao.getCheapestProduct(user_id)
        if not result:
            return jsonify("Not Found"), 404
        d = self.build_dict(result)
        return jsonify(d)

    def getMostExpensiveProduct(self, user_id):
        dao = UserDAO()
        result = dao.getMostExpensiveProduct(user_id)
        if not result:
            return jsonify("Not Found"), 404
        d = self.build_dict(result)
        return jsonify(d)

    def checkAdmin(self, user_id):
        dao = UserDAO()
        result = dao.checkAdmin(user_id)

        return result
