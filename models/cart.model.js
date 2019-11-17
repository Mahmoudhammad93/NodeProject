const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/shop';

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const cartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = data => {
    return new Promise ((resolve, reject) => {
        mongoose
        .connect(DB_URL)
        .then(() => {
            let item = new cartItem(data);
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