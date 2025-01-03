const jwt=require('jsonwebtoken')
const User=require('../models/user')

const userAuth= async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
           return res.status(401).send("please login")
        }
        const decodedData=await jwt.verify(token,"DEV@Tinder$790");
        const {_id}=decodedData;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("No user found")
        }
        req.user=user;
        next();
    }catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }
}

module.exports ={userAuth}