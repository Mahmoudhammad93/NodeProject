const authModel = require("../models/auth.model")

exports.getSignup = (req, res, next) => {
    res.render('signup')
}

exports.postSignup = (req, res, next) => {
    authModel
    .createNewUser(
        req.body.username,
        req.body.email,
        req.body.password
    )
    .then(() => res.redirect('/login'))
    .catch(err => {
        console.log(err)
        res.redirect('/signup')
    })
}

exports.getLogin = (req, res, next) => {
    res.render('login',{
        authError: req.flash('authError')[0]
    })
}

exports.postLogin = (req, res, next) => {
    authModel
    .login(req.body.email, req.body.password)
    .then((id) => {
        req.session.userId = id;
        res.redirect('/');
    })
    .catch(err => {
        console.log(err)
        req.flash('authError', err)
        res.redirect('/login')
    })
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
}