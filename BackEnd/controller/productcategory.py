from flask import jsonify
from dao.productcategory import ProductCategoryDAO


class ProductCategoryController:
    def build_dict(self, row):
        result = {'category_id': row[0], 'name': row[1], 'description': row[2]}

        return result

    def getAllCategories(self):
        dao = ProductCategoryDAO()
        result_t = dao.getAllCategories()

        result = []
        for r in result_t:
            d = self.build_dict(r)
            result.append(d)

        return jsonify(result)



