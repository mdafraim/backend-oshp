const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../model/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if(error) return res.status(400).send('Invalid email or Password');

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or Password');
 
   const valiPassword = await bcrypt.compare(req.body.password, user.password);
   if(!valiPassword) return res.status(400).send('Invalid email or Password');
   
   const token = user.generateAuthToken();
   res.send(token)
   //const token = user.generateUserToken();
   //res.send(token);
});

function validateLogin(req){
   const schema = {
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
   };
   return Joi.validate(req, schema);
}

module.exports = router;