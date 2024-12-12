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
  res.status(400).send("error in saving data")
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
app.patch("/user",async(req,res)=>{
  const emailId=req.body.emailId;
  const user= req.body
  console.log(emailId)

  try{
      await User.findOneAndUpdate({emailId:emailId},user)
      res.send("user updated successfully")
  }catch(err){
    res.status(400).send('something went wrong')
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


