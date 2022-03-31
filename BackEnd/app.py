from flask import Flask
from controller.productcategory import ProductCategoryController


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


if __name__ == '__main__':
    app.run(debug=1)
