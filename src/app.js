const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{

  const user = new User(req.body)
 try{
  await user.save();
  res.send("user data successfully saved")
 } catch(err){
  res.status(400).send("error in saving data"+err.message)
 }
})

app.get("/user",async (req,res)=>{
 
  try{
    const user =await User.find({emailId:req.body.emailId}); 
   if(user.length===0){
    res.send("no user with this")
   }else{
    res.send(user)
   }
 
}catch(err){
  res.status(400).send('something went wrong')
}
  
})

app.get("/feed",async(req,res)=>{
  try{

  const user = await User.find({})
  res.send(user);    
}
  catch(err){
    res.status(400).send('something went wrong')
  }
})

//delete the document
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId
  try{
     const user = await User.findByIdAndDelete(userId);
     res.send('user delted successfully')
  }catch(err){
    res.status(400).send('something went wrong')
  }
})

//update the document
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data= req.body
  // console.log(emailId)

  try{
    const ALLOWED_UPDATE = ["photoUrl", "gender", "age", "skills", "about"];

    // Check if all keys in the user object are allowed for update
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
      await User.findOneAndUpdate({userId:userId},data,{runValidators:true})
      res.send("user updated successfully")
  }catch(err){
    res.status(400).send('issue in user update, '+err.message)
  }
})

connectDB().then(() => {
  console.log("database connected successfully....")
  app.listen(3000, () => {
    console.log('successfully connected to port')
  });

}).catch((err) => {
  console.error("connection failed")
});


