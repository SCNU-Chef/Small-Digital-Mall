const express = require('express');
const app=express();
const userRouter=require('./router/user.js')
const cartRouter=require('./router/shopping_cart.js')
const orderRouter=require('./router/order.js')
const productsRouter=require('./router/products.js')
const bodyParser=require('body-parser');
app.listen(8080);
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static('./public'));
app.use(express.static('./js'));
app.use(express.static('./router'));
app.use(express.static('./css'));
app.use(express.static('./img'));
app.use('/user',userRouter);
app.use('/shopping_cart',cartRouter);
app.use('/order',orderRouter);
app.use('/products',productsRouter);