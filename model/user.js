const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id },'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

function userValidate(user){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validate = userValidate;