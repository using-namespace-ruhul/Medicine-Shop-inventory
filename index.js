const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/meds')

mongoose.connect('mongodb://localhost:27017/medShop')
    .then(() => {
        console.log('Connection open');
    })
    .catch((e) => {
        console.log('Error');
        console.log(e);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//request to get the home page
app.get('/home', async(req, res) => {
    const products = await Product.find({});
    res.render('home', { products });
})

//request to get the bill page after selecting the require inputs
app.get('/bill', async(req, res) => {
    const med = await req.query.med;
    const sQty = await req.query.qty;
    const product = await Product.findOne({ value: med });
    let bQty = product['qty'];
    const update = await Product.updateOne({ value: med }, { $set: { qty: `${bQty-sQty}` } })
    res.render('bill', { name: product['name'], qty: sQty, rate: product['price'] });
    // console.log(product['name']);
})


// To add meds
// app.get('/home/add', async(req, res) => {
//     res.render('add');
// })

// app.get('/home/add/new', async(req, res) => {
//     console.log(req.query);
// })



app.listen(3000, () => {
    console.log('App is listening on 3000');
})