const express =require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter= express.Router();
const ConnectionRequest=require("../models/connectionRequest")

const USER_DATA="firstName lastName age gender skills";

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests= await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate('fromUserId',USER_DATA)
      
        
        if (!connectionRequests || connectionRequests.length === 0) {
            return res.status(404).json({ message: "No connection requests found" });
        }
        
        res.json({message: "connection requests", data: connectionRequests,})

        
    }catch(err){
        res.status(400).json("Error : "+err.message)
    }
})


userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
    
  const loggedInUser=req.user;

  const connectionRequests=await ConnectionRequest.find({
    $or: [
        {fromUserId:loggedInUser._id,status:"accepted"},
        {toUserId:loggedInUser._id,status:"accepted" }
    ]
  }).populate('fromUserId',USER_DATA).populate('toUserId',USER_DATA);

    
  if (!connectionRequests || connectionRequests.length === 0) {
    return res.status(404).json({ message: "No connection requests found" });
}

const data=connectionRequests.map((row)=>{
    if(row.fromUserId.toString()===loggedInUser._id){
        return row.toUserId
    }
    return row.fromUserId
})


  res.json({message: "your connections",data})
    }catch(err){
        res.status(400).json("Error : "+err.message)
    }
})

module.exports=userRouter;