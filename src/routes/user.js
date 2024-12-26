const express =require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter= express.Router();
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")
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

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{  
        const loggedInUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit =  limit >50 ? 50 : limit;
        const skip =(page-1)*limit;

        
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed =new Set();

        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        });


        const users=await User.find({
            $and: [
                {_id:{$nin: Array.from(hideUserFromFeed)}},
                {_id:{$ne: loggedInUser._id}}
            ]  

        }).select(USER_DATA).skip(skip).limit(limit);


        res.json({data: users});
    }catch(err){
        res.status(400).json("Error : "+err.message)
    }
})

module.exports=userRouter;