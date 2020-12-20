const express = require('express')
const mongoose = require('mongoose')
const db = require("./config/keys.js").mongoURI
const app = express()
const bodyParser = require('body-parser')

const users = require('./routes/api/users.js')

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() =>{
        console.log('mongoose数据库成功')
    })
    .catch(err =>{console.log(err)})
app.get("/",(req,res) =>{
    res.send('hello world')
})

// bodyParser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api/users",users)
app.use("/users",users)

const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`监听${port}`)
})