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
        commentId:req.body.commentId,
        content : req.body.content,
    })
    newComment.save()
                .then(comment =>{res.json(comment)})
})
router.post('/commentList',(req,res) =>{
    const commentId = req.body.commentId
    Comment.find({commentId}).then(comments =>{
        if(!comments){
            return res.status(404).json('暂无评价')
        }
        res.json(comments)
    })
})
router.get('/test',(req,res) =>{
    res.json('comment')
})
module.exports = router;