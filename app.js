const express = require('express')
const path = require('path')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')

const app = express()


// http.createServer((req, res) => {
//     if(req.url === '/') res.end('Hello From Home')
//     else if(req.url === '/about') res.end('Hello From About')
//     else res.end('404 not found')
// }).listen(port, () => console.log('Server listen on port: '+ port));

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(express.static(path.join(__dirname, 'default-img')))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
const port = 3000;
app.listen(port, () => console.log('Server listen on port: '+ port));