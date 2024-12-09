const adminAuth = (req,res,next)=>{
    console.log("connceted successfully")
    const token = "abc";
    const adminauthentication = token==="abc"
   !adminauthentication ? res.status(401).send("admin authentication failed!!!") : next();
};
 
const userAuth = (req,res,next)=>{
    console.log("user connceted successfully")
    const token = "abcc";
    const adminauthentication = token==="abcc"
   !adminauthentication ? res.status(401).send("admin authentication failed!!!") : next();
};

module.exports = {adminAuth,userAuth,}