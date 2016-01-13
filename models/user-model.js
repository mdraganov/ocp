'use strict';

let mongoose = require('mongoose'),
    messageSchema = require('./message-model').schema,
    advertSchema = require('./advert-model').schema;

let userSchema = new mongoose.Schema({
    name: String,
    adverts: [advertSchema],
    sentMessages: [messageSchema],
    receivedMessages: [messageSchema]
});

mongoose.model('User', userSchema);