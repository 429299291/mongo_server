const express = require('express')
const mongoose = require('mongoose')
const db = require("./config/keys.js").mongoURI
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users.js')
const profiles = require('./routes/api/profiles.js')
const comments = require('./routes/api/comments.js')
const orderList = require('./routes/api/orderList')

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() =>{
        console.log('mongoose数据库成功')
    })
    .catch(err =>{console.log(err)})
app.get("/",(req,res) =>{
    res.send('hello world')
})

var http=require("http");
 var server=http.createServer();
 server.on("request",function(req,res){
     if(req.url!=="/favicon.ico")
         console.log(req.url);
     res.end();
 });

//跨域问题
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type,Authorization");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})
// bodyParser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api/users",users)
app.use("/api/profiles",profiles)
app.use("/api/comments",comments)
app.use('/api/orderLists',orderList)
// app.use("/users",users)

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 7003
app.listen(port,() => {
    console.log(`监听${port}`)
})