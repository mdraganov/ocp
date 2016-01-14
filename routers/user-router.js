// routers/product-router.js
'use strict';

let express = require('express');

let router = new express.Router();

let mongoose = require('mongoose');
let User = mongoose.model('User');
let Advert = mongoose.model('Advert');

let controller = require('../controllers/user-controller')(User, Advert);

router.get('/profile',controller.getProfile)
    .get('/profile/:id', controller.getById);

module.exports = function(app) {
    app.use('/users', router);
};