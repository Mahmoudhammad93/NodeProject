const productsModal = require('../models/products.model')
const cartModal =require('../models/cart.model')
const path = require("path");

exports.getHome = (req, res, next) => {
    // Get Category
    let category = req.query.category
    let productsPromise
    if (category && category !== 'all') productsPromise = productsModal.getCategory(category)
    else productsPromise = productsModal.getAllProducts()
    productsPromise.then(products => {
        res.render('index',{
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            items: cartModal.getAllProductInCart,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Home'
        })
    })
}

