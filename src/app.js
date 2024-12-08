const express = require('express');

const app = express();




app.get("/user",(req,res)=>{
    res.send({name:"jinto",place:"mandalam"})
});

app.post("/user",(req,res)=>{
    res.send("succefully added to DB")
});

app.delete("/user",(req,res)=>{
    res.send("deleted")
});

app.patch("/user",(req,res)=>{
    res.send("updated the user info")
});
app.use("/user",(req,res)=>{
    res.send('jkhomepage')
});

app.use("/aa",(req,res)=>{
    res.send('jkhomepage')
});


app.listen(3000,()=>{
    console.log('successfully connected to port')
});