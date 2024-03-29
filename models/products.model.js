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

// Add New Product
exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
        .connect(DB_URL)
        .then(() => {
            let newProduct = new Product(data);
            return newProduct.save();
        })
        .then(products => {
            mongoose.disconnect()
            resolve(products);
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

// Get All Products
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

// Get One Category
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

// Get Product By ID
exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.findById(id)
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

