const router = require("express").Router()
const bodyParser = require("body-parser")
const check = require('express-validator').check
const authGuard = require('./guards/auth.guard')

const authController = require("../controllers/auth.controller")

router.get('/signup', authGuard.notAuth, authController.getSignup)

router.post('/signup', authGuard.notAuth,
    bodyParser.urlencoded({extended: true}),
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Email is required'),
    check('password').isLength({min: 8}).withMessage('Password must be at least 8 charachter'),
    check('confPassword').custom((value, {req}) => {
        if(value === req.body.password) return true;
        else throw 'Password not matches';
    }),
    authController.postSignup
)

router.get('/login', authGuard.notAuth, authController.getLogin)

router.post('/login', 
    bodyParser.urlencoded({extended: true}),
    authController.postLogin
)

router.all('/logout', authGuard.isAuth, authController.logout)

module.exports = router