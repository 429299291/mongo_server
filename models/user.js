const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userschema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    phone:{
        type:Number,
    },
    data:{
        type:Date,
        default:Date.now
    }
})
module.exports = User = mongoose.model('users',userschema)