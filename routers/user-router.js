// routers/product-router.js
'use strict';

let express = require('express');

let router = new express.Router();

let mongoose = require('mongoose');
let User = mongoose.model('User');

let controller = require('../controllers/user-controller')(User);

router.get('/register', controller.getForm)
    .get('/:id', controller.getById)
    .post('/register', controller.post);

module.exports = function(app) {
    app.use('/users', router);
};