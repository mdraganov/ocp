// models/advert-model.js
'use strict';

let mongoose = require('mongoose');

let advertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: function () {
            return Date.now();
        }
    },
    category:{
      type:String
    },
    price: {
        type: Number
    },
    owner: {
        name: String,
        id: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    comments: {
        type: Array
    },
    votes: {
        type: Number
    },
    categoryId: {
        type: Number
    }
});

mongoose.model('Advert', advertSchema);

module.exports.schema = advertSchema;