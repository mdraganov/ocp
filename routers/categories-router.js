// routers/categories-router.js
'use strict';

let express = require('express');

let router = new express.Router();
let mongoose = require('mongoose');
let Category = mongoose.model('Category');
let controller = require('../controllers/categories-controller')(Category);

router.get('/all',controller.getAll)
      .post('/add',controller.post)
      .get('/add',controller.getAddForm)
      .get('/:id',controller.getById);

module.exports = function (app) {
    app.use('/categories', router);
};