const express = require('express');

const app = express();

const { adminAuth,userAuth } = require("./middlewares/auth")

app.use("/admin",adminAuth)


app.get("/user/login", (req, res, next) =>{
    res.send("user login")
} );

app.get("/user/register",userAuth, (req, res, next) => { 
    res.send("user regiter")
    });
    
app.get("/admin/login", (req, res, next) =>{
    res.send("admin login")
});

app.get("/admin/register", (req, res, next) => { 
res.send("admin regiter")
});


app.listen(3000, () => {
    console.log('successfully connected to port')
});
