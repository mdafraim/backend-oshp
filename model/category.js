const mongoose = require('mongoose');
const Joi = require('joi');

categorySchema = new mongoose.Schema({
    name: String
});

const Category = mongoose.model('Category', categorySchema);


function categoryValidate(category){
    const schema = {
        name: Joi.string().min(5).required(),
    };
    return Joi.validate(category, schema);
}

 exports.categorySchema = categorySchema;
 exports.Category = Category;
 exports.validate = categoryValidate;
