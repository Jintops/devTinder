const express = require('express');
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,

}));
app.use(express.json()); 
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);



//update the document
// app.patch("/user/:userId",async(req,res)=>{ 
//   const userId=req.params?.userId;
//   const data= req.body
//   // console.log(emailId)

//   try{
//     const ALLOWED_UPDATE = ["photoUrl", "gender", "age", "skills", "about"];

//     // Check if all keys in the user object are allowed for update
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATE.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }
//       await User.findOneAndUpdate({userId:userId},data,{runValidators:true})
//       res.send("user updated successfully")
//   }catch(err){
//     res.status(400).send('issue in user update, '+err.message)
//   }
// })

connectDB().then(() => {
  console.log("database connected successfully....")
  app.listen(process.env.PORT, () => {
    console.log('successfully connected to port')
  });

}).catch((err) => {
  console.error("connection failed")
});


