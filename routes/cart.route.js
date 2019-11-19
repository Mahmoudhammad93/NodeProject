const router = require("express").Router()
const bodyParser = require("body-parser")
const check = require('express-validator').check

const authGuard = require('./guards/auth.guard')

const cartController = require("../controllers/cart.controller")

router.get('/', authGuard.isAuth, cartController.getCart)

router.post('/', authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}),
    check('amount')
    .not()
    .isEmpty()
    .withMessage('How many of this product')
    .isInt({min: 1})
    .withMessage('Amount must be grater than 0'),
    cartController.postCart
)

module.exports = router