const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/shop'

const productSchema = mongoose.Schema({
    name: String,
    img: String,
    price: Number,
    describe: String,
    category: String
})

const Product = mongoose.model('product', productSchema)

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}

exports.getCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category: category})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}