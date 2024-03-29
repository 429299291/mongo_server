const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const keys = require('../../config/keys');
const user = require('../../models/user');
// const user = require('../../models/user');
router.get('/test',(req,res) =>{
    res.json('34535')
})
router.post("/register",(req,res) => {
    User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(204).json({email:'邮箱已被注册'})
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    avatar,
                    identity:req.body.identity || '普通会员',
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    actualName: req.body.actualName,
                    profession: req.body.profession,
                    address: req.body.address,
                    balance: 0,
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
//编辑个人资料
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) =>{
    const usersFields = {}
    console.log(req.body)
    if(req.body.name){
        usersFields.name = req.body.name
    }else if(req.body.email){
        usersFields.email = req.body.email
    }else if(req.body.profession){
        usersFields.profession = req.body.profession
    }else if(req.body.actualName){
        usersFields.actualName = req.body.actualName
    }else if(req.body.phoneNumber){
        usersFields.phoneNumber = req.body.phoneNumber
    }else if(req.body.address){
        usersFields.address = req.body.address
    }else if(req.body.balanceChange){
        usersFields.balance = req.body.balanceChange
    }else{
        return res.status(404).json('不能修改')
    }

    User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: usersFields},
        {new:true}
    ).then(profile =>{
        res.status(200).json(profile)
    })
})

router.get("/1",(req,res) =>{
    User.findOne({email:'429299291@qq.com'})
        .then(user =>{
            if(!user){
                return res.status(404).json('用户出错')
            }else{
                return res.status(200).json(user)
            }
        })
})
router.get("/managementData",(req,res) =>{
    User.find()
        .then(user =>{
            return res.status(200).json(user)
        })
})
router.post("/login",(req,res) =>{
    const email = req.body.email
    const password = req.body.password
    console.log(email)
    //查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json('用户不存在')
            }
            //密码匹配
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result == true){
                    const rule = {id:user.id,name:user.name}
                    // jwt.sign('规则','加密名字','过期时间','箭头函数')
                    jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) =>{
                        if(err) throw err;
                        res.json({
                            success:true,
                            token:"Bearer "+token
                        })
                    })
                    // res.json({msg:'密码成功'})
                }else{
                    res.status(404).json({msg:'密码错误'})
                }
            });

        })
})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) =>{
    // res.json({msg:'success'})
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        password:req.user.password,
        identity:req.user.identity,
        avatar:req.user.avatar,
        profession:req.user.profession,
        actualName:req.user.actualName,
        phoneNumber:req.user.phoneNumber,
        address:req.user.address,
        balance:req.user.balance
    })
})
module.exports = router;