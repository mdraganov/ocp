'use strict';
var encryption = require('../helpers/encryption.js');

let mongoose = require('mongoose'),
    messageSchema = require('./message-model').schema,
    advertSchema = require('./advert-model').schema;

module.exports.init = function () {
    let userSchema = new mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        adverts: [advertSchema],
        sentMessages: [messageSchema],
        receivedMessages: [messageSchema],
        salt: String,
        hashPass: String,
        roles: [String]
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    })

    mongoose.model('User', userSchema);
}