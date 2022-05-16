from flask import jsonify
from dao.order import OrderDao
from dao.cart import CartDao
from dao.product import ProductDAO


class OrderController:
    def build_order_dict(self, row):
        result = {'order_id': row[0], 'user': row[1], 'date_ordered': row[2], 'total_cost': row[3]}
        return result

    def build_order_item_dict(self, row):
        result = {'ordered_item_id': row[0], 'product': row[1], 'quantity': row[2], 'price': row[3], 'order': row[4]}
        return result

    def getOrderItems(self, order_id):
        dao = OrderDao()
        result_t = dao.getOrderItems(order_id)

        result = []
        for r in result_t:
            result.append(self.build_order_item_dict(r))

        return result

    def getOrderById(self, order_id):
        dao = OrderDao()
        order = dao.getOrderById(order_id)
        result = [self.build_order_dict(order)]
        order_items = self.getOrderItems(order_id)
        result.extend(order_items)

        return jsonify(result)

    def getAllOrders(self):
        dao = OrderDao()
        result_t = dao.getAllOrders()

        result = []
        for r in result_t:
            temp = []
            d = self.build_order_dict(r)
            temp.append(d)
            items = self.getOrderItems(d['order_id'])
            temp.extend(items)
            result.append(temp)


        return jsonify(result)


    def getOrdersByUser(self, user_id):
        dao = OrderDao()
        result_t = dao.getAllUserOrders(user_id)

        result = []
        for r in result_t:
            temp = []
            d = self.build_order_dict(r)
            temp.append(d)
            items = self.getOrderItems(d['order_id'])
            temp.extend(items)
            result.append(temp)

        return jsonify(result)

    def createOrder(self, user_id):
        dao = OrderDao()
        c_dao = CartDao()
        p_dao = ProductDAO()

        cart_items = c_dao.getCart(user_id)
        c_dao.clearCartItems(user_id)

        order_id = dao.newOrder(user_id)
        count = 0

        for item in cart_items:
            inventory = dao.getInventory(item[2])
            if inventory >= item[1]:
                price = dao.getPrice(item[2])
                dao.newOrderItem(item[1], price, item[2], order_id)
                count += 1
                p_dao.updateProduct(item[2], price, inventory-item[1])

        if count == 0:
            dao.deleteOrder(order_id)
            return jsonify("Not Valid Order"), 404

        result = self.getOrderById(order_id)

        return result




