from flask import jsonify
from dao.order import OrderDao


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
    # def getAllOrders(self):
