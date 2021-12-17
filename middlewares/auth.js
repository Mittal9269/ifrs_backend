const { json } = require("express");
const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.header("x-auth-token"); 
    if(!token)
        return res.status(403).json({message:"Authorization Denied, please Login"});
    try {
        const verification = jwt.verify(token,process.env.JWT_SECRET);
        console.log(verification);
        req.user = verification;

        if(req.user.isRestricted)
            return res.status(401).json({message:"Your Account Is Banned, Contact Customer Support"});
        next();
    } catch (error) {
        res.status(400).json({message:"Please Login"});
    }
}
module.exports = {auth};