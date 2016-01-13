'use strict';

let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    text: {type: String, required: true, min: 1, max:200},
    from: String,
    to: String,
    date: Date
});

mongoose.model('Message', messageSchema);