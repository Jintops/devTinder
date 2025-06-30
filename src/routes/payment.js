const express = require("express");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 70000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: "value3",
        lastName: "value2",
        membershipType: "silver",
      },
    });

    res.json({order})
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

module.exports = paymentRouter;
