const express = require('express');

const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileDate } = require('../utils/validation');
const { validatePassword } = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require('bcrypt')

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {

    const user = req.user
    res.send(user)
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {

    if (!validateEditProfileDate(req)) {
      throw new Error("updation failed")
    }
    const user = req.user;


    Object.keys(req.body).forEach((key) => {
      { user[key] = req.body[key] }
    })

    await user.save();

    res.json({ message: `${user.firstName} profile updated successfully......`, data: user, })
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
});

profileRouter.patch("/profile/editpassword", userAuth, async (req, res) => {
  try {

    validatePassword(req);
    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10)

    await User.findOneAndUpdate({ _id: req.user._id }, { password: passwordHash })
    res.send("user password updated");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message)
  }
})



module.exports = profileRouter;