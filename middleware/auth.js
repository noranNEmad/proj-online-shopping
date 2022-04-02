const User = require("../db/models/user.model")
const jwt = require("jsonwebtoken")
/*
authorization header
verify token
check token , id correct
if !user unauth
return user
*/
const auth = async(req, res, next) =>{
    try{
        const token = req.header("Authorization")
        const decoded = jwt.verify(token, "autho")
        // res.send(decoded)
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
            
        })
        if(!user) throw new Error("invalid credintials")
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            errors:e.message,
            message:"unauthorized"
        })
    }
}
module.exports = auth 