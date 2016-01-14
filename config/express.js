'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    logger = require('morgan'),
    path = require('path');

module.exports = function (app) {
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '../views'));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({secret: 'ninja',resave:true,saveUninitialized:true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, '../public')));
}