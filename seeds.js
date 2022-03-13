const mongoose = require('mongoose');
const Product = require('./models/meds');

mongoose.connect('mongodb://localhost:27017/medShop')
    .then(() => {
        console.log('Connection open');
    })
    .catch((e) => {
        console.log('Error');
        console.log(e);
    })

// const p = new Product({
//     name: 'P650',
//     price: 30,
//     qty: 200
// })

// p.save();
// .then(p => {
//     console.log(p)
// }).catch(e => {
//     console.log(e)
// })

const meds = [{
    value: 1,
    name: 'P650',
    price: 30,
    qty: 200
}, {
    value: 2,
    name: 'Vicodin',
    price: 45,
    qty: 200
}, {
    value: 3,
    name: 'Albuterol',
    price: 30,
    qty: 200
}, {
    value: 4,
    name: 'Lisinopril',
    price: 25,
    qty: 200
}, {
    value: 5,
    name: 'Levothyroxine',
    price: 68,
    qty: 200
}, {
    value: 6,
    name: 'Gabapentin',
    price: 105,
    qty: 200
}, {
    value: 7,
    name: 'Amlodipine',
    price: 88,
    qty: 200
}]

Product.insertMany(meds);

// .then(res => {
//     console.log(res)
// }).catch(e => {
//     console.log(e)
// })