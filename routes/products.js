const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const { Product, validate } = require('../model/product');
const { Category } = require('../model/category');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //const category = await Category.findById(req.params.id);
    //if(!category) return res.status(400).send(error.details[0].message);

    let product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    });
    product = await product.save();
    res.send(product);
});

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const product = Product.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl
    }, {new: true });

    if(!product) return res.status(400).send(error.details[0].message);
    res.send(product)
})

module.exports = router;