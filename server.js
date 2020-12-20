const express = require('express')
const mongoose = require('mongoose')
const db = require("./config/keys.js").mongoURI
const app = express()

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() =>{
        console.log('mongoose成功')
    })
    .catch(err =>{console.log(err)})
app.get("/",(req,res) =>{
    res.send('hello world')
})

const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`监听${port}`)
})