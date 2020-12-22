const mongoose = require('mongoose')
const Schema = mongoose.Schema
const profileschema = new Schema({
    names:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    usersex:{
        type:String,
    },

    data:{
        type:Date,
        default:Date.now
    }
})
module.exports = Profile = mongoose.model('profile',profileschema)
// module.exports = User = mongoose.model('webs',userschema)
