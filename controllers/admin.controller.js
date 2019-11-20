const productModal = require('../models/products.model')
const cartModal = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('ValidationErrors'),
        isUser: true,
        items: cartModal.getItemsByUser,
        isAdmin: true
    });
};

exports.postAdd = (req, res, next) => {
    console.log(validationResult(req).array())
}