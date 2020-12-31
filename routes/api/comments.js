const express = require('express');
const router = express.Router();
const Comment = require('../../models/comment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport')
const keys = require('../../config/keys');
const comment = require('../../models/comment');
router.post('/comment',(req,res) =>{
    const newComment = new Comment({
        name : req.body.name,
        content : req.body.content,
    })
    newComment.save()
                .then(comment =>{res.json(comment)})
})
router.get('/comment',(req,res) =>{
    Comment.find().then(comments =>{
        res.json(comments)
    })
})
router.get('/test',(req,res) =>{
    res.json('comment')
})
module.exports = router;