const  express = require('express');

const app = express();


app.use("/user",(req,res,next)=>{
    console.log("connceted to 1 st")
    // res.send("1 st responce!!")
    next();
 
},(req,res,next)=>{
    console.log("connceted to 2 st")
    // res.send("2 st responce!!")
    next();

},(req,res,next)=>{
    console.log("connceted to 3 st")
    res.send("3 st responce!!")
    
});


app.listen(3000,()=>{
    console.log('successfully connected to port')
});