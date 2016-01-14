var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    customId: {
        type: Number
    },
    price: {
        type: Number
    },
    owner: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    comments: {
        type: Array
    },
    votes: {
        type: Number
    },
    categoryId: {
        type: Number
    },
    publishedOn:{
        type:Date,
        default:Date.now()
    }
});

mongoose.model('Item', itemSchema);