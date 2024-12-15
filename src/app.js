const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user");
const {validateSignUpDate}=require('./utils/validation')
const bcrypt=require('bcrypt')
const cookieParser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const {userAuth}=require('./middlewares/auth')
const app = express();

app.use(express.json());
app.use(cookieParser())


app.post("/signup",async (req,res)=>{
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

app.post("/login",async (req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId})
    if(!user){
      throw new Error("Invalid credential")
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(isPasswordValid){

      const token=jwt.sign({_id:user._id},"DEV@Tinder$790", { expiresIn: '1h' })
      res.cookie("token",token, { expires: new Date(Date.now() + 900000)});
      res.send("login success!!!!")
    }else{
      throw new Error("Invalid credential")
    }
  }catch(err){
    res.status(400).send("ERROR :"+err.message)
   }
  
})

app.get("/profile", userAuth ,async(req,res)=>{
  try{
  
  const user=req.user
  res.send(user)
  }catch(err){
    res.status(400).send("ERROR :"+err.message)
   }
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{

  console.log('sending connection request')
   res.send('connection request sent')
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


