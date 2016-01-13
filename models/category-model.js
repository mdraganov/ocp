var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
   name:{
       type:String
   } ,
    customId:{
        type:Number
    },
    items:{
        type:Array
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }
});

mongoose.model('Category',categorySchema);