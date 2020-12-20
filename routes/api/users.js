const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const user = require('../../models/user');
router.get('/test',(req,res) =>{
    res.json({
        name:'login name'
    })
})
router.post("/register",(req,res) => {
    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({email:'邮箱已被注册'})
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    avatar,
                    password: req.body.password,
                    phone: req.body.phone
                })
                // 密码加密模式
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        if(err) throw err
                        newUser.password = hash;//加密过的密码
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                    });
                });

            }
        })
})
router.get("/1",(req,res) =>{
    User.findOne({email:'429299291@qq.com'})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:'用户出错'})
            }else{
                return res.status(200).json(user)
            }
        })
})
router.post("/login",(req,res) =>{
    const email = req.body.email
    const password = req.body.password
    //查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:'用户不存在'})
            }
            //密码匹配
            bcrypt.compare(password, user.password, (err, result) =>{
                // result == true
                if(result == true){
                    res.json({msg:'密码成功'})
                }else{
                    res.json({msg:'密码错误'})
                }
            });

        })
})
module.exports = router;