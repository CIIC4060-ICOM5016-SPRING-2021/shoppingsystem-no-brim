from flask import Flask, request
from controller.productcategory import ProductCategoryController
from controller.product import ProductController
from controller.order import OrderController
from controller.cart import CartController
from controller.liked import LikedController
from controller.user import UserController
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/NO-BRIM/ProductCategories/categories')
def category_handler():
    return ProductCategoryController().getAllCategories()


@app.route('/NO-BRIM/ProductCategories/categories/bought')
def category_bought_handler():
    return ProductCategoryController().getMostBoughtCategory()


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


@app.route('/NO-BRIM/Products/products/add', methods=['GET', 'POST'])
def product_new_handler():
    if request.method == 'GET':
        return ProductController().getAllProducts()
    elif request.method == 'POST':
        return ProductController().addNewProduct(request.json)


@app.route('/NO-BRIM/Products/products/update/<int:product_id>', methods=['GET', 'PUT'])
def product_update_handler(product_id):
    if request.method == 'GET':
        return ProductController().getProductById(product_id)
    elif request.method == 'PUT':
        return ProductController().updateProduct(product_id, request.json)


@app.route('/NO-BRIM/Products/products/delete/<int:product_id>', methods=['GET', 'PUT'])
def product_delete_handler(product_id):
    if request.method == 'GET':
        return ProductController().getProductById(product_id)
    elif request.method == 'PUT':
        return ProductController().deleteProduct(product_id, request.json)


@app.route('/NO-BRIM/Products/products/global/bought')
def product_bought_handler():
    return ProductController().getMostBoughtProduct()


@app.route('/NO-BRIM/Products/products/global/liked')
def product_liked_handler():
    return ProductController().getMostLikedProduct()


@app.route('/NO-BRIM/Products/products/global/cheapest')
def product_cheapest_handler():
    return ProductController().getCheapestProduct()


@app.route('/NO-BRIM/Products/products/global/expensive')
def product_expensive_handler():
    return ProductController().getMostExpensiveProduct()


@app.route('/NO-BRIM/Order/orders/<int:order_id>')
def order_byid_handler(order_id):
    return OrderController().getOrderById(order_id)


@app.route('/NO-BRIM/Order/orders')
def order_handler():
    return OrderController().getAllOrders()

@app.route('/NO-BRIM/Order/orders/user/<int:user_id>')
def order_user_handler(user_id):
    return OrderController().getOrdersByUser(user_id)


@app.route('/NO-BRIM/Cart/cart/')
def cart_handler():
    return CartController().getAllCarts()


@app.route('/NO-BRIM/Cart/cart/<int:user_id>')
def cart_byid_handler(user_id):
    return CartController().getCart(user_id)


@app.route('/NO-BRIM/Cart/cart/add', methods=['GET', 'POST'])
def cart_item_new_handler():
    if request.method == 'GET':
        return CartController().getAllCarts()
    elif request.method == 'POST':
        return CartController().addCartItem(request.json)


@app.route('/NO-BRIM/Cart/cart/delete/<int:cart_item_id>', methods=['GET', 'DELETE'])
def cart_delete_handler(cart_item_id):
    if request.method == 'GET':
        return CartController().getAllCarts()
    elif request.method == 'DELETE':
        return CartController().removeCartItem(cart_item_id)

@app.route('/NO-BRIM/Cart/cart/update/<int:cart_item_id>', methods=['GET', 'PUT'])
def cart_update_handler(cart_item_id):
    if request.method == 'GET':
        return CartController().getCart()
    elif request.method == 'PUT':
        return CartController().updateCart(cart_item_id, request.json)

@app.route('/NO-BRIM/Cart/cart/clear/<int:user_id>', methods=['GET', 'DELETE'])
def cart_clear_handler(user_id):
    if request.method == 'GET':
        return CartController().getAllCarts()
    elif request.method == 'DELETE':
        return CartController().clearCartItems(user_id)


@app.route('/NO-BRIM/Cart/cart/update/<int:cart_item_id>', methods=['GET', 'PUT'])
def cart_update_handler(cart_item_id):
    if request.method == 'GET':
        return CartController().getAllCarts()
    elif request.method == 'PUT':
        return CartController().updateCart(cart_item_id, request.json)


@app.route('/NO-BRIM/Liked/liked_items/')
def liked_handler():
    return LikedController().getAllLikes()


@app.route('/NO-BRIM/Liked/liked_items/<int:user_id>')
def liked_byid_handler(user_id):
    return LikedController().getLikes(user_id)


@app.route('/NO-BRIM/Liked/liked_items/add', methods=['GET', 'POST'])
def liked_item_new_handler():
    if request.method == 'GET':
        return LikedController().getAllLikes()
    elif request.method == 'POST':
        return LikedController().addLikedItem(request.json)


@app.route('/NO-BRIM/Liked/liked_items/delete/<int:liked_item_id>', methods=['GET', 'DELETE'])
def liked_delete_handler(liked_item_id):
    if request.method == 'GET':
        return LikedController().getAllLikes()
    elif request.method == 'DELETE':
        return LikedController().removeLikedItem(liked_item_id)

@app.route('/NO-BRIM/User/rank-most-bought-category/<int:user_id>')
def user_rank_most_bought_category_handler(user_id):
    return UserController().getRankMostBoughtCategory(user_id)

@app.route('/NO-BRIM/User/rank-most-bought-product/<int:user_id>')
def user_rank_most_bought_product_handler(user_id):
    return UserController().getRankMostBoughtProdcut(user_id)


@app.route('/NO-BRIM/User/cheapest-product-bought/<int:user_id>')
def user_cheapest_product_bought_handler(user_id):
    return UserController().getCheapestProduct(user_id)


@app.route('/NO-BRIM/User/most-expensive-product-bought/<int:user_id>')
def user_most_expensive_product_bought_handler(user_id):
    return UserController().getMostExpensiveProduct(user_id)


 ############### USER ROUTES #########################################
@app.route('/NO-BRIM/Users/users')
def user_handler():
    return UserController().getAllUsers()

@app.route('/NO-BRIM/Users/users/<int:user_id>')
def user_byid_handler(user_id):
    return UserController().getUserById(user_id)


@app.route('/NO-BRIM/Users/users/create_User', methods=['GET', 'POST'])
def create_user_handler():
    if request.method == 'GET':
        return UserController().getAllUsers()
    elif request.method == 'POST':
        return UserController().addNewUser(request.json)

@app.route('/NO-BRIM/Users/users/delete_User/<int:user_id>', methods=['GET', 'DELETE'])
def delete_user_byid_handler(user_id):
    if request.method == 'GET':
        return UserController().getAllUsers()
    elif request.method == 'DELETE':
        return UserController().deleteUserById(user_id)

@app.route('/NO-BRIM/Users/users/update/<int:user_id>', methods=['GET', 'PUT'])
def user_update_handler(user_id):
    if request.method == 'GET':
        return UserController().getUserByID(user_id)
    elif request.method == 'PUT':
        return UserController().updateUser(user_id, request.json)


@app.route('/NO-BRIM/Order/buy-cart/<int:user_id>', methods=['GET', 'POST'])
def buy_cart(user_id):
    if request.method == 'GET':
        return CartController().getCart(user_id)
    elif request.method == 'POST':
        return OrderController().createOrder(user_id)


@app.route('/NO-BRIM/Users/users/login', methods=['GET', 'POST'])
def login():
    return UserController().login(request.json)


if __name__ == '__main__':
    app.run(debug=1)
