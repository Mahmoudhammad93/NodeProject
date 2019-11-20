const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/shop';

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = data => {
    return new Promise ((resolve, reject) => {
        mongoose
        .connect(DB_URL)
        .then(() => {
            let item = new CartItem(data);
            return item.save();
        })
        .then(() => {
            mongoose.disconnect()
            resolve()
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getItemsByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return CartItem.find({userId: userId})
        })
        .then(items => {
            mongoose.disconnect()
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

// Get All Products In Cart
exports.getAllProductInCart = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}
