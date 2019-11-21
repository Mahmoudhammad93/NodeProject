const productModal = require('../models/products.model')
const cartModal = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        validationErrors: req.flash('ValidationErrors'),
        isUser: true,
        items: cartModal.getItemsByUser,
        isAdmin: true,
        pageTitle: 'Add Product'
    });
};

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()){
        req.body.file = req.file.filename;
        productModal
        .addNewProduct(req.body)
        .then(() => {
            req.flash('added', true);
            res.redirect('/admin/add')
        })
        .catch(err => {
            next(err)
        })
    }else{
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/admin/add')
    }
}