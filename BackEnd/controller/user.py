from flask import jsonify
from dao.user import UserDAO

class UserController:

    def build_dict(self,row):
        result = {'user_id': row[0],'username':row[1], 'password': row[2],'first_name':row[3],'last_name': row[4],
                  'phone': row[5],'email':row[6],'created_at':row[7],'is_admin':row[8]}
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


    def addNewUser(self,json):
        username = json['Username']
        password = json['Password']
        first_name = json['First Name']
        last_name = json['Last Name']
        phone = json['Phone']
        email = json['Email']
        is_admin = json['Is admin'] # is admin really supposed to be here in the creation?*****

        dao = UserDAO()
        id = dao.createUser(username,password, first_name, last_name, phone, email, is_admin)
        json['Id'] = id
        return jsonify(json), 201

    def updateUser(self,user_id,json):
        #do we need to update everything??
        username = json['Username']
        password = json['Password']
        first_name = json['First Name']
        last_name = json['Last Name']
        phone = json['Phone']
        email = json['Email']
        is_admin = json['Is admin']

        dao = UserDAO()
        updated = dao.updateUser(user_id, username, password, first_name, last_name,phone, email, is_admin)
        if updated:
            return jsonify(json),200
        else:
            return jsonify("Not Found"), 404


    def deleteUser(self,user_id):
        dao = UserDAO()
        result = dao.deleteUserById(user_id)
        if not result:
            return jsonify("Not Found"), 404

        d = self.build_dict(result)
        return jsonify(d)
