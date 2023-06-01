const mongoose = require('mongoose');
const Joi = require('joi');
const { categorySchema } = require('./category');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);


function validateProduct(product) {
    const schema = {
        title: Joi.string().min(3).required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        imageUrl: Joi.string().required()
    }
    return Joi.validate(product, schema)
}

exports.Product = Product;
exports.validate = validateProduct;
