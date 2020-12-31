const express = require('express');
const router = express.Router();
const User = require('../../models/user')

const Profile = require('../../models/profile');
const passport = require('passport');
// const user = require('../../models/user');
router.get('/test',(req,res) =>{
    res.json({
        name:'profile name'
    })
})
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res) =>{
    // res.json({msg:'success'})
    const profileFields = {}
    if(req.body.names) profileFields.names = req.body.names;

    new Profile(profileFields).save().then(profile =>{
        res.json(profile);
    })
})
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) =>{
    Profile.find()
        .then(profile =>{
            if(!profile) {
                return res.status(404).json('没有内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res) =>{
    Profile.findOne({_id:req.params.id})
        .then(profile =>{
            if(!profile) {
                return res.status(404).json('没有内容')
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),(req,res) =>{
    // res.json({msg:'success'})
    const profileFields = {}
    if(req.body.names) profileFields.names = req.body.names;
    console.log('===========')
    console.log(req.body.names)

    Profile.findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields},
        {new:true}
    ).then(profile =>{
        res.json(profile)
    })
})
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res) =>{
    Profile.findOneAndRemove({_id:req.params.id}).then(profile =>{
        profile.save().then(profile =>{
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
    })

})

module.exports = router;