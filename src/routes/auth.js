const express =require('express');
const authRouter=express.Router();
const {validateSignUpDate}=require('../utils/validation')
const bcrypt=require('bcrypt')
const User = require("../models/user");


authRouter.post("/signup",async (req,res)=>{ 
  try{
   const {firstName,lastName,emailId,password}=req.body;

  validateSignUpDate(req)

  const passwordHash=await bcrypt.hash(password,10)

  const user = new User({
  firstName,
  lastName,
  emailId,
  password:passwordHash
  })
 
  await user.save();
  res.send("user data successfully saved")
 } catch(err){
  res.status(400).send("ERROR :"+err.message)
 }
}) ;

authRouter.post("/login",async (req,res)=>{
    try{
      const {emailId,password}=req.body;
      const user=await User.findOne({emailId:emailId})
      if(!user){
        throw new Error("Invalid credential")
      }
      const isPasswordValid=await user.validatePassword(password)
      if(isPasswordValid){
  
        const token=await user.getJWT();
        res.cookie("token",token, { expires: new Date(Date.now() + 900000)});
        res.send("login success!!!!")
      }else{
        throw new Error("Invalid credential")
      }
    }catch(err){
      res.status(400).send("ERROR :"+err.message)
     }
    
  })

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{ 
    expires: new Date(Date.now())
  })
  res.send("logout success!!!!")
})


module.exports=authRouter;