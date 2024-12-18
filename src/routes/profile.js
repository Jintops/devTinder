const express = require('express');

const profileRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const { validateEditProfileDate } = require('../utils/validation');

profileRouter.get("/profile/view", userAuth ,async(req,res)=>{
    try{
    
    const user=req.user
    res.send(user)
    }catch(err){
      res.status(400).send("ERROR :"+err.message)
     }
  })

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{

    if(!validateEditProfileDate(req)){
      throw new Error("updation failed")
    }
    const user=req.user;
    
   
    Object.keys(req.body).forEach((key)=>{
      {user[key]=req.body[key]}
    })

    await user.save();

    res.send(`${user.firstName} profile updated successfully......`)
  }catch(err){
     res.status(400).send("ERROR :"+err.message)
  }
 })

module.exports=profileRouter;