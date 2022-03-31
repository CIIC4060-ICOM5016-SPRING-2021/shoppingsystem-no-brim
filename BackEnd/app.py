from flask import Flask
from controller.productcategory import ProductCategoryController
from controller.product import ProductController

app = Flask(__name__)


@app.route('/')
def hell_world():
    return 'Hello World'


@app.route('/dude')
def hell_dude():
    return 'Hello Dude'


@app.route('/ProductCategories/categories')
def category_handler():
    return ProductCategoryController().getAllCategories()


@app.route('/NO-BRIM/Products/products')
def product_handler():
    return ProductController().getAllProducts()


@app.route('/NO-BRIM/Products/products/<int:product_id>')
def product_byid_handler(product_id):
    return ProductController().getProductById(product_id)


@app.route('/NO-BRIM/Products/products/price/<order>')
def product_byprice_handler(order):
    return ProductController().getProductByPrice(order)


@app.route('/NO-BRIM/Products/products/name/<order>')
def product_byname_handler(order):
    return ProductController().getProductByName(order)


@app.route('/NO-BRIM/Products/products/category/<int:category_id>')
def product_bycategory_handler(category_id):
    return ProductController().getProductByCategory(category_id)


if __name__ == '__main__':
    app.run(debug=1)
