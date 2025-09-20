const express = require('express');
const authRouter = express.Router();
const { validateSignUpDate } = require('../utils/validation')
const bcrypt = require('bcrypt')
const User = require("../models/user");


authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, emailId, password,location } = req.body;

    validateSignUpDate(req)

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      firstName, 
      emailId,
      password: passwordHash,
      location

    })

    const signData = await user.save();
    const token = await signData.getJWT();
    // In your login route
res.cookie("token", token, {
    expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    httpOnly: true,
    secure: true, // Important for HTTPS
    sameSite: 'none' // Important for cross-origin
});
    res.json({ message: "user data successfully saved", data: signData })
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
});
 
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId })
    if (!user) {
      throw new Error("Invalid Credential")
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      const token = await user.getJWT();
     // In your login route
res.cookie("token", token, {
    expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    httpOnly: true,
    secure: true, // Important for HTTPS
    sameSite: 'none' // Important for cross-origin
});
      res.send(user)
    } else {
      throw new Error("Invalid Credential")
    }
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
})

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,         // prevents client-side JS from reading it
    expires: new Date(0),   // expire immediately
    secure: true, // only over HTTPS in prod
    sameSite: "lax",       
  });
  res.status(200).send({ message: "Logout successful!" });
});



module.exports = authRouter;