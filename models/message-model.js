'use strict';

let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    text: {type: String, required: true, min: 1, max: 200},
    subject: {type: String, required: true, min: 1, max: 50},
    from: String,
    to: {type: String, required: true, min: 1, max: 30},
    date: {type: Date, required: true}
});

mongoose.model('Message', messageSchema);

module.exports.schema = messageSchema;