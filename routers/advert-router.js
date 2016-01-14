// routers/product-router.js
'use strict';

let express = require('express'),
    config = require('../config/config'),
    multer = require('multer');

var storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        console.log(file);
        let ext = file.originalname.split('.')
            .pop();
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
});

var upload = multer({
    storage: storage
});

let router = new express.Router();

module.exports = function (app) {
    let mongoose = require('mongoose');
    let Advert = mongoose.model('Advert');

    let controller = require('../controllers/advert-controller')(Advert, app);

    router.get('/', controller.get)
        .get('/add', controller.getForm)
        .get('/:id', controller.getById)
        .post('/', upload.single('image-file'), controller.post);

    app.use('/adverts', router);
};