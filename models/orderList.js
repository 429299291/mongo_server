const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderListSchema = new Schema({
    actualName:{
        type:String
    },
    address:{
        type:String
    },
    buynumber:{
        type:Number
    },
    currentPrice:{
        type:Number
    },
    img:{
        type:String
    },
    name:{
        type:String
    },
    oldPrice:{
        type:Number
    },
    price:{
        type:Number
    },
    phoneNumber:{
        type:String
    },
    productDetails:{
        type:String
    },
    startTimeText:{
        type:String
    },
    totalPrice:{
        type:Number
    },
    transaction:{
        type:String
    },
    unit:{
        type:String
    },
    shipType:{
        type:String
    },
    data:{
        type:Date,
        default:Date.now
    }
    

})
module.exports = OrderList = mongoose.model('orderList',orderListSchema)