const User = require('../models/user');
const Uploade = require('../models/uploadedimg');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const _ = require('lodash');

// for gmail and so..
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');
const client = new OAuth2Client("634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com")

// for email sending
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox0b39eb244f964e07b948bbd3d9c67d92.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});




// exports.signup = (req,res)=>{
//     console.log(req.body);
//     const {name,email,password} = req.body;
//     User.findOne({email}).exec(async (err,user)=>{
//         if(user){
//             return res.status(400).json({error:"user with this email already exist"});
//         }
//         const newUser = new User({name,email,password});
//         console.log(newUser);
//        // newUser.save();
//         /*const pi = await newUser.save();
//         console.log(pi);*/
//         newUser.save((err,success)=>{
//             if(err){
//                 console.log("error in signup: ",err);
//                 return res.status(400).json({error:err})
//             }
//             res.json({
//                 message:"signup success"
//             })
//         })
//     })
// }




exports.signup = (req,res)=>{
    console.log(req.body); 
    const {name,email,password} = req.body;
    User.findOne({email}).exec(async (err,user)=>{
        if(user){
            return res.status(400).json({error:"user with this email already exist",redirect:"login"});
        }

        const token = jwt.sign({name,email,password},process.env.JWT_ACC_ACTIVATE,{expiresIn:'20m'});


        const data = {
            from: 'cjb@bc.com',
            to: 'mnnitians2021@gmail.com',
            subject: 'account activation link',
            html:`
                <h2>please click on given link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
                <p>mai chutiya hu</p>
            `
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.json({
                    error:err.message
                })
            }
            res.json({message:'email has been sent!!'})
            console.log(body);
        });




    //   const newUser = new User({name,email,password});
    //     console.log(newUser);
    //    // newUser.save();
    //     /*const pi = await newUser.save();
    //     console.log(pi);*/
    //     newUser.save((err,success)=>{
    //         if(err){
    //             console.log("error in signup: ",err);
    //             return res.status(400).json({error:err})
    //         }
    //         res.json({
    //             message:"signup success"
    //         })
    //     }) 
    })
}



exports.accountActivation = (req,res)=>{
    const {token} = req.body;
    if(token){
        jwt.verify(token,process.env.JWT_ACC_ACTIVATE,function(err,decodedToken){
            if(err){
                return res.status(400).json({error:"incorrect or expired link"})
            }
            const {name,email,password} = decodedToken;
            User.findOne({email}).exec(async (err,user)=>{
                if(user){
                    return res.status(400).json({error:"user with this email already exist",redirect:"login"});
                }
                const newUser = new User({name,email,password});
                console.log(newUser);
            // newUser.save();
                /*const pi = await newUser.save();
                console.log(pi);*/
                newUser.save((err,success)=>{
                    if(err){
                        console.log("error in signup: ",err);
                        return res.status(400).json({error:"eooor activating account"})
                    }
                    res.json({
                        name:success.name,
                        email:success.email,
                        id:success.id,
                        redirect:"profile"
                    })
                })
            })
        })
    }
    else{
        return res.json({error:"something went wrong!!!"})
    }

}


exports.signin = (req,res)=>{
    const {email,password} = req.body;
    User.findOne({email}).exec(async(err,user)=>{
        if(user){
            if(user.password==password){
                return res.status(200).json({
                    id:user.id,
                    redirect:"profile"
                })
            }
            else{
                return res.status(400).json({
                    message:"incorrect password",
                    redirect:"login"
                })
            }
        }
        else{
            return res.status(400).json({
                message:"incorrect username",
                redirect:"signup"
            })
        }
    })
}



exports.googlelogin = (req,res) =>{
    const {tokenId} = req.body;
    console.log(tokenId);
    client.verifyIdToken({idToken : tokenId,audience:"634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"}).then(response =>{
        const {email_verified,name,email} = response.payload;
        console.log(response.payload);
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error: "something went wrong..."
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id:user._id},process.env.JWT_SIGNIN_key,{expiresIn:'7d'});
                        const {_id,name,email} = user;
                        res.json({
                            token,
                            user:{_id,name,email},
                            redirect:"profile"
                        })
                    }
                    else{
                        let password = email+process.env.JWT_SIGNIN_key;
                        let newUser = new User({name,email,password});
                        console.log(newUser);
                        newUser.save((err,data)=>{
                            if(err){
                                console.log("yaha tak chal raha hai!!",newUser);
                                return res.status(400).json({
                                    error: "something went wrong..."
                                })
                            }
                            else{
                                const token = jwt.sign({_id:data._id},process.env.JWT_SIGNIN_key,{expiresIn:'7d'});
                                const {_id,name,email} = newUser;
                                
                                res.json({
                                    token,
                                    user:{_id,name,email},
                                    edirect:"profile"
                                })
                            }
                        })
                    }
                }
            })
        }
    })
    console.log(); 
}    

exports.editProfile = (req,res)=>{
    const{sex,interest,tags,about,profilepic,id} = req.body;
    console.log(id);
    //let email = "something@gmail.com";

    User.findById(id,(error,user)=>{
        console.log(user);
        if(error){
            res.json({
                message:"try again",
                redirect:"editprofile"
            })
        }
        if(user){
            // res.status(200).json({
            //     message:"user exist in datbase"
            // })
            user.sex = sex;
            user.interest = interest;
            user.tags = tags;
            user.about = about;
            user.profilepic = profilepic;
        }
        user.save((err,data)=>{
            if(err){
                res.json({
                    message:"error in updation"
                })
            }
            else{
                res.json({data});
            }
        });
        // res.status(400).json({
        //     message:"user id incorrect"
        // })
    })

    // User.find({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         res.json(user[0].physique);
    //     }
    // })






    // User.findOne({email}).exec(async(err,user)=>{
    //     console.log(user);
    //     if(user){
    //         // res.status(200).json({
    //         //     message:"user exist in datbase"
    //         // })
    //         user.sex = sex;
    //         user.interest = interest;
    //         user.tags = tags;
    //         user.about = about;
    //         user.profilepic = profilepic;
    //     }
    //     user.save((err,data)=>{
    //         if(err){
    //             res.json({
    //                 message:"error in updation"
    //             })
    //         }
    //         else{
    //             res.json({data});
    //         }
    //     });
    //     // res.status(400).json({
    //     //     message:"user id incorrect"
    //     // })
    // })
}

exports.uploadPic =  (req,res)=>{
    const {imgUrl,likeCount,caption,id} = req.body;
    const UploadUserpic = new Uploade({
        imgUrl: imgUrl,
        likeCount: likeCount,
        caption: caption
    })
    // UploadUserpic.save((err,data)=>{
    //     if(err){
    //         res.json({
    //             message:"error in saving uploaded image to image uploader datbase"
    //         })
    //     }
    //     else{
    //         res.json({data});
    //     }
    // });
////    let email = "something@gmail.com";

    User.findById(id,(error,user)=>{
        //console.log(user);
        if(error){
            res.json({
                message:"try again",
                redirect:"uploadpic"
            })
        }
        if(user){
             user.uploadedimg.push(UploadUserpic) //= [UploadUserpic];
             console.log(user)
            ////email = user.email;
        }
        user.save((err,data)=>{
            if(err){
                res.json({
                    message:"error in updation"
                })
            }
            else{
                res.json({
                    data,
                    message:"success"
                });
            }
        });
    })


    // User.updateOne({email:req.body.email},{$push:{uploadedimg:UploadUserpic,},},function(err){
    //     if(err){
    //         console.log("error while updation")
    //         res.json({
    //             message:"try again",
    //             redirect:"uploadpic"
    //         })
    //     }
    //     else{
    //         console.log("meal added and user updated succesfully");
    //         res.status(200).json({
    //             message:"success"
    //         })
    //     }
    // })
}