const config = require('config');
const mongoose = require('mongoose');
const users = require('./routes/users')
const auth = require('./routes/auth')
const category = require('./routes/category');
const products = require('./routes/products');
const express = require('express');
var cors = require('cors');

if (!config.has('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined..!');
    process.exit(1);
}
const app = express();

mongoose.connect('mongodb://localhost/oshop')
.then(() => console.log('connected MongoDB..!!'))
.catch(err => console.error('Could not connect mongoDB..!', err));
app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/products', products)








const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The Listing Port On ${port}..!`));