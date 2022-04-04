from flask import Flask, request
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

@app.route('/NO-BRIM/Products/products/add',methods=['GET','POST'])
def product_new_handler():
    if request.method == 'GET':
        return ProductController().getAllProducts()
    elif request.method == 'POST':
        return ProductController().addNewProduct(request.json)

@app.route('/NO-BRIM/Products/products/update/<int:product_id>',methods=['GET','PUT'])
def product_price_handler(product_id):
    if request.method == 'GET':
        return ProductController().getProductById(product_id)
    elif request.method == 'PUT':
        return ProductController().updateProductPrice(product_id, request.json)




if __name__ == '__main__':
    app.run(debug=1)
