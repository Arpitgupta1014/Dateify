const User = require("../Models/UserModel");
const Uploade = require("../Models/ImageModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"this super secret key",async(err,decodedToken)=>{
            if(err){
                res.json({status:false});
                next();
            }
            else{
                const user = await User.findById(decodedToken.id);
                if(user){
                    var temp = {
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        age:user.age,
                        sex:user.sex,
                        tags:user.tags,
                        about:user.about,
                        city:user.city,
                        company:user.company,
                        institution:user.institution,
                        uploadedimg:user.uploadedimg,
                    }
                    res.json({status:true ,user: temp});
                } 
                else res.json({status:false});
                next();
            }
        })
    }
    else{
        res.json({status:false});
        next();
    }
}
