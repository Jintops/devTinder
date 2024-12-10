const express = require('express');
const connectDB = require('./config/database')
const User = require("./models/user");
const user = require('./models/user');
const app = express();

app.post("/signup",async (req,res)=>{
  const user = new User({
    firstName:"thomaas",
    lastName:"ps",
    emailId:"to@ps.com",
    password:"sdfdqwert123"
  })
 try{
  await user.save();
  res.send("user data successfully saved")
 } catch(err){
  res.status(400).send("error in saving data")
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


