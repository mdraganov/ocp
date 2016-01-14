'use strict';

let mongoose = require('mongoose');
let connectionString = "mongodb://localhost/ocp-db";
let UserModel = require('../models/user-model');

module.exports = function(connectionString) {
    mongoose.connect(connectionString);
    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database setup...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    UserModel.init();
};