const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const { Category, validate } = require('../model/category');

const router = express.Router();

router.post('/', async (req, res)=> {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let category = new Category({
        name: req.body.name
    });

    category = await category.save();
    res.send(category);
});

router.get('/', async (req, res) => {
    const category = await Category.find();
    res.send(category);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).send('Given id does not exits');
    res.send(category);
})


module.exports = router;