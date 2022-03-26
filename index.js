const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/meds')

app.use(express.urlencoded({ extended: true }));

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
app.get('/', async(req, res) => {
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
app.get('/add', async(req, res) => {
    res.render('add');
})

app.post('/add', async(req, res) => {
    // let { rate } = await req.body;
    // console.log(req.body);
    // const value = await req.body.value;
    // const name = await req.body.name;
    // const price = await req.body.rate;
    // const qty = await req.body.qnty;
    // const newM = { valu: value, name: name, price: price, qty: qty };
    const newMed = new Product(req.body);
    await newMed.save();
    console.log(newMed);
    res.redirect('/');
})



app.listen(3000, () => {
    console.log('App is listening on 3000');
})