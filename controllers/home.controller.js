const productsModal = require('../models/products.model')

exports.getHome = (req, res, next) => {

    let s = data['category'];

    console.log(s)

    // Get Category
    let category = req.query.category
    let productsPromise
    if (category && category !== 'all') productsPromise = productsModal.getCategory(category)
    else productsPromise = productsModal.getAllProducts()
    productsPromise.then(products => {
        res.render('index',{
            products: products
        })
    })
}

