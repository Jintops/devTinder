const express =require('express');
const requestRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try{
 
  const fromUserId=req.user._id;
  const toUserId=req.params.toUserId;
  const status=req.params.status;

  const allowedStatus=["ignored","interested"]
  
   if(!allowedStatus.includes(status)){
    return res.status(400).json({message:"invalid status type "+status})
   }

   const toUser=await User.findById(toUserId)
   if(!toUser){
    throw new Error("you cannot send request ")
   }
 
  const existingConnectionRequest=await ConnectionRequest.findOne({
    $or :
    [
      {fromUserId,toUserId},
      {fromUserId:toUserId,toUserId:fromUserId}
    ]
  })

 
   if(existingConnectionRequest){
    throw new Error("request already sent.......")

   }
  const connectionRequest=new ConnectionRequest({
    fromUserId,
    toUserId,
    status
  });

  const data= await connectionRequest.save();
 
  res.json({message:req.user.firstName+" is " +status+ " in "+toUser.firstName,data})


}catch(err){
  res.status(400).send("message :" +err.message)
}
  });
  
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user;
  
    const {status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"];

    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"status is not valid"})
    } 

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    })
    if(!connectionRequest){
      return res.status(400).json({message:"connection  failed"})
    }
   connectionRequest.status=status;
   const data= await connectionRequest.save();
   
   res.json({message: status +"request",data})

  }catch(err){
    res.status(400).send("message :" +err.message)
  }
});


module.exports=requestRouter;