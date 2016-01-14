'use strict';
let express = require('express'),
    app = express();

let router = new express.Router();
let auth = require('../config/authentication');

let mongoose = require('mongoose');
let User = mongoose.model('User');

let controller = require('../controllers/user-controller')(User);

module.exports = function (app) {
    app.get('/register',controller.getRegister)
    app.post('/register', controller.postRegister);

    app.get('/login',controller.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/', function (req, res) {
        app.locals.currentUser = req.user;
        res.redirect('/home');
    });
};