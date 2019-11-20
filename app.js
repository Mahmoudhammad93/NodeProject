const express = require('express')
const path = require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const authRouter = require('./routes/auth.route')
const adminRouter = require('./routes/admin.route')

const app = express()


// http.createServer((req, res) => {
//     if(req.url === '/') res.end('Hello From Home')
//     else if(req.url === '/about') res.end('Hello From About')
//     else res.end('404 not found')
// }).listen(port, () => console.log('Server listen on port: '+ port));
// app.use(express.static('public'))
// app.use(express.static('files'))
// app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'default-img')))
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/shop',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret secret to hashed express session .....',
    saveUninitialized: false,
    store: STORE
}))

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/admin', adminRouter)

const port = 3000;
app.listen(port, () => console.log('Server listen on port: '+ port));