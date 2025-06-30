const Razorpay=require('razorpay')
console.log('Key ID:', process.env.RAZORPAY_KEY_ID);
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports=instance;