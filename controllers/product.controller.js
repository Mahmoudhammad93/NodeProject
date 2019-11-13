const productsModel = require('../models/products.model')

exports.getProduct = (req, res, next) => {
    
    // To Get ID
    let id = req.params.id

    // To Get Products
    productsModel.getProductById(id).then((product) => {
        res.render('product', {
            product: product
        })
    })



}