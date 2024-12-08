const express = require('express');

const app = express();

app.use("/aaa",(req,res)=>{
    res.send("main")
})

app.use("/aa",(req,res)=>{
    res.send('jkhomepage')
});

app.use("/",(req,res)=>{
    res.send("working")
})
console.log('lsdkfls')
app.listen(3000,()=>{
    console.log('successfully connected to port')
});