const express = require('express');
const router = express.Router();
const OrderList = require('../../models/orderList')
router.get('/orderListall',(req,res) =>{
    OrderList.find()
        .then(datas=>{
            console.log('houtai')
            res.status(200).json(datas)
        })
    // res.status(200).json('orderList OK')
})
router.post('/orderList',(req,res) =>{
    const newOrderList = new OrderList({
        name:req.body.name,
        actualName:req.body.actualName,
        address:req.body.address,
        buynumber:req.body.buynumber,
        currentPrice:req.body.currentPrice,
        img:req.body.img,
        oldPrice:req.body.oldPrice,
        price:req.body.price,
        phoneNumber:req.body.phoneNumber,
        productDetails:req.body.productDetails,
        startTime:req.body.startTime,
        startTimeText:req.body.startTimeText,
        totalPrice:req.body.totalPrice,
        transaction:req.body.transaction,
        unit:req.body.unit,
        shipType:req.body.shipType
    })
    new OrderList(newOrderList).save().then(res =>{
        res.json(newOrderList)
    })
})
module.exports = router;