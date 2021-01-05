const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentschema = new Schema({
    content:{
        type:String,
        required:true
    },
    commentId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
    },
    data:{
        type:Date,
        default:Date.now
    }
})
module.exports = Comment = mongoose.model('comments',commentschema)
