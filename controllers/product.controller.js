const productsModel = require('../models/products.model')

exports.getProduct = (req, res, next) => {
    // To Get Products
    productsModel.getFirstProduct().then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        })
    })
}

exports.getProductById = (req, res, next) => {
    // To Get ID
    let id = req.params.id
    // To Get Products
    productsModel.getProductById(id).then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        })
    })
}