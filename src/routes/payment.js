const express = require('express');
const { userAuth } = require('../middlewares/auth');

const paymentRouter=express.Router();
const razorpayInstance=require("../utils/razorpay")


paymentRouter.post('/payment/create',userAuth,async(req,res)=>{
    try{

   await razorpayInstance.orders.create({
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt#1",
  "notes": {
    "firstName": "value3",
    "lastName": "value2"
  }
})


    }catch(err){
        res.status(400).send("ERROR :" + err.message)
    }
})



module.exports=paymentRouter;