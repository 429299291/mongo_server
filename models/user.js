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
    identity:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    actualName:{
        type:String,
    },
    profession:{
        type:String,
    },
    address:{
        type:String,
    },
    shipType:{
        type:String
    },
    balance:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = User = mongoose.model('users',userschema)
// module.exports = User = mongoose.model('webs',userschema)
