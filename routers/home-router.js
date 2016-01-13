// routers/home-router.js
'use strict';

let express = require('express');

let router = new express.Router();

let mongoose = require('mongoose');

let Advert = mongoose.model('Advert');

let controller = require('../controllers/home-controller')(Advert);

router.get('/', controller.get);

module.exports = function(app) {
  app.use('/home', router);
};