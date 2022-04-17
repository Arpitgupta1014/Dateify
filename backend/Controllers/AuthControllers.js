const User = require("../Models/UserModel");
const Uploade = require("../Models/ImageModel");
const jwt = require("jsonwebtoken");
const expressJWT = require('express-jwt');
const _ = require('lodash'); 
const bcrypt = require('bcrypt');
const saltRound = 10;

// for gmail and so.....
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');
const client = new OAuth2Client("634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com")

// for email sending....
const mailgun = require("mailgun-js");
const { addListener } = require('nodemon');
const DOMAIN = 'sandbox0b39eb244f964e07b948bbd3d9c67d92.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

// jwt createToken function....
const maxAge = 7*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},"this super secret key",{
        expiresIn: maxAge,
    });
};

// const handleErrors = (err)=>{
//     let errors = {email:"",password:""};

//     if(err.message === "Incorrect Email"){
//         errors.email = "That email is not registered";
//     }

//     if(err.message === "Incorrect Password"){
//         errors.email = "That password is not correct";
//     }

//     if(err.code === 11000){
//         errors.email = "Email is alraedy registered";
//         return errors;
//     }
//     if(err.message.includes("mango validation failed")){
//         Object.values(err.errors).forEach(({properties})=>{
//             errors[properties.path] = properties.message;
//         });
//     }
//     return errors;
// }

// module.exports.register = async (req,res,next)=>{
//     try{
//         const{name, email, password} = req.body;
//         console.log(req.body);
//         const user = await User.create({name, email, password});
//         const token = createToken(user._id);

//         res.cookie("jwt",token,{
//             withCredentials:true,
//             httpOnly:false,
//             maxAge:maxAge*1000,
//         });
//         res.status(201).json({user:user._id,created:true});
//     }
//     catch(err){
//         console.log(err);
//         const errors = handleErrors(err);
//         res.json({errors,created:false});
//     }
// }

module.exports.register = async(req,res,next)=>{
    try{
        const{name, email, password} = req.body;
        bcrypt.hash(password,saltRound,function(error,hash){
            User.findOne({email}).exec((err,user)=>{
                if(user){
                    return res.status(400).json({error:"user already exist"});
                }
                else{
                    const newUser = new User({name:name,email:email,password:hash});
                    newUser.save((err,user)=>{
                        if(err){
                            console.log("error in registration: ",err);
                            return res.status(400).json({error:"error ocuured"});
                        }
                        if(user){
                            const token = createToken(user._id);

                            res.cookie("jwt",token,{
                                withCredentials:true,
                                httpOnly:false,
                                maxAge:maxAge*1000,
                            });
                            res.status(201).json({user:user._id,created:true});
                        }
                    })
                }
            })
        })
    }
    catch(err){
        next(err);
    }
}

// module.exports.accountActivation = async(req,res,next)=>{
//     try{
//         const {token} = req.body;
//         if(token){
//             jwt.verify(token,process.env.JWT_ACC_ACTIVATE,async(err,decodedToken)=>{
//                 if(err){
//                     return res.status(400).json({error:"incorrect or expired link"})
//                 }
//                 const {name,email,password} = decodedToken;
//                 const user = await User.create({name,email,password});
//                 const token = createToken(user._id);
//                 res.cookie("jwt",token,{
//                     withCredentials:true,
//                     httpOnly:false,
//                     maxAge:maxAge*1000,
//                 });
//                 res.status(201).json({user:user._id,created:true});
//             })
//         }
//     }
//     catch(err){
//         next(err);
//     }
// }

module.exports.googlelogin = async(req,res,next)=>{
    try{
        const {tokenId} = req.body;
        console.log(tokenId);
        client.verifyIdToken({idToken : tokenId,audience:"634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"}).then(response =>{
            const {email_verified,name,email} = response.payload;
            console.log("this is payloaad :",response.payload);
            console.log("payload ends");
            if(email_verified){
                User.findOne({email}).exec((err,user)=>{
                    if(err){
                        return res.status(400).json({
                            error: "something went wrong..."
                        })
                    }else{
                        if(user){
                            const token = createToken(user._id);
                            res.cookie("jwt",token,{
                                withCredentials:true,
                                httpOnly:false,
                                maxAge:maxAge*1000,
                            });
                            res.status(201).json({user:user._id,created:false});
                        }
                        else{
                            let password = email + process.env.SECURING_AUTO_GEN_GOOGLE_PASSWORD;
                            let newUser = new User({name,email,password});
                            console.log(newUser);
                            newUser.save((err,user)=>{
                                if(err){
                                    console.log("yaha tak chal raha hai!!",newUser);
                                    return res.status(400).json({
                                        error: "something went wrong..."
                                    })
                                }
                                else{
                                    const token = createToken(user._id);
                                    res.cookie("jwt",token,{
                                        withCredentials:true,
                                        httpOnly:false,
                                        maxAge:maxAge*1000,
                                    });
                                    res.status(201).json({user:user._id,created:true});
                                }
                            })
                        }
                    }
                })
            }
        })
    }
    catch(err){
        console.log(err);
        const errors = handleErrors(err);
        res.json({errors,created:false});
    }
}

// module.exports.login = async (req,res,next)=>{
//     try{
//         const {email,password} = req.body;
//         console.log("this is login");
//         console.log(req.body);
//         console.log("user is fetched");
//         var name = "";
//         User.findOne({email}).exec(async (err,userr)=>{
//             if(err){
//                 return res.status(400).json({
//                     error: "email does not exist.."
//                 })
//             }
//             else{
//                 name = userr.name;
//                 console.log(name);
//                 console.log(email);
//                 console.log(password);
//                 const user = await User.login(name,email,password);
//                 const token = createToken(user._id);

//                 res.cookie("jwt",token,{
//                     withCredentials:true,
//                     httpOnly:false,
//                     maxAge:maxAge*1000,
//                 });
//                 res.status(200).json({user:user._id,created:true});
//             }
//         })
        
//     }
//     catch(err){
//         console.log(err);
//         const errors = handleErrors(err);
//         res.json({errors,created:false});
//     }
// }

module.exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        console.log(req.body);
        User.findOne({email}).exec(async (err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "email does not exist"
                })
            }
            if(user){
                bcrypt.compare(password,user.password,function(err,userr){
                    if(userr===true){
                        // console.log("this is user :",user);
                        // console.log("this is user id :",user._id);
                        const token = createToken(user._id);

                        res.cookie("jwt",token,{
                            withCredentials:true,
                            httpOnly:false,
                            maxAge:maxAge*1000,
                        });
                        res.status(200).json({user:user._id,created:true});
                    }
                    else{
                        return res.status(400).json({
                            error: "password is incorect",
                        })
                    }
                })
                // if(password === user.password){
                //     const token = createToken(user._id);

                //         res.cookie("jwt",token,{
                //             withCredentials:true,
                //             httpOnly:false,
                //             maxAge:maxAge*1000,
                //         });
                //         res.status(200).json({user:user._id,created:true});
                // }
                // else{
                //     return res.status(400).json({
                //                     error: "password is incorect",
                //                 })
                // }
            }
        })
    }
    catch(err){
        next(err);
    }
}


module.exports.editProfile = (req,res,next)=>{
    try{
        const{age,gender,passion,aboutme,city,company,institution,id} = req.body;
        console.log(req.body);
        console.log(id);
        //let email = "something@gmail.com";
        User.findById(id,(error,user)=>{
            // console.log(user);
            if(error){
                res.json({
                    message:"try again",
                    redirect:"editprofile"
                })
            }
            if(user){
                if(age != ""){
                    user.age = age;
                }
                if(gender != ""){
                    user.sex = gender;
                    // if(gender === "Male"){
                    //     user.sex = 1;
                    // }
                    // else if(gender === "Female"){
                    //     user.sex = 0;
                    // }
                    // else{
                    //     user.sex = 2;
                    // }
                }
                if(passion.length != 0){
                    user.tags = passion;
                }
                if(aboutme != ""){
                    user.about = aboutme;
                }
                if(city != ""){
                    user.city = city;
                }
                if(company != ""){
                    user.company = company;
                }
                if(institution != ""){
                    user.institution = institution;
                }
            }
            user.save((err,data)=>{
                if(err){
                    res.json({
                        message:"error in updation"
                    })
                }
                else{
                    console.log("this is users sex :",data.sex);
                    res.status(200).json({
                        message:"success",
                        user:data._id,
                    });
                }
            });
        })

    }
    catch(err){
        next(err);
    }
}

module.exports.uploadPic = (req,res,next)=>{
    console.log("u r in uplod pic");
    try{
        const {imgUrl,caption,id} = req.body;
        // console.log(imgUrl,caption,id);
        const UploadUserpic = new Uploade({
            imgUrl: imgUrl,
            caption: caption
        })
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
                console.log("user exist")
                ////email = user.email;
            }
            user.save((err,data)=>{
                if(err){
                    res.json({
                        message:"error in updation"
                    })
                }
                else{
                    console.log("user saved succesfully..")
                    res.json({
                        data,
                        message:"success"
                    });
                }
            });
        })
    }
    catch(err){
        next(err);
    }
}

module.exports.deletePost = (req,res,next)=>{
    try{
        const{imgUrl,id} = req.body;
        User.findById(id,(error,user)=>{
            if(error){
                res.json({
                    message:"try again",
                    redirect:"uploadpic"
                })
            }
            if(user){
                var arrayOfimage = user.uploadedimg;
                    var filtered = arrayOfimage.filter(function(value,index,arr){
                        return value.imgUrl!=imgUrl;
                    })
                    user.uploadedimg = filtered;
                    user.save((err,data)=>{
                        if(err){
                            res.json({
                                message:"error in updation"
                            })
                        }
                        else{
                            res.json({
                                data,
                                message:"deleated succesfully"
                            });
                        }
                    });
            }
        })
    }
    catch(err){
        next(err);
    }
}

module.exports.userFeeds = (req,res,next)=>{
    try{
        const {id} = req.body;
        var tag1 = "";
        var tag2 = "";
        var tag3 = "";
        var tag4 = "";
        var tag5 = "";
        var city = "";
        var company = "";
        var institution = "";
        var gender = 0;
        User.findById(id,(error,user)=>{
            if(error){
                res.json({
                    message:"try again",
                    status:400,
                })
            }
            if(user){
                tag1 = user.tags[0];
                tag2 = user.tags[1];
                tag3 = user.tags[2];
                tag4 = user.tags[3];
                tag5 = user.tags[4];
                city = user.city;
                company = user.company;
                institution = user.institution;
                gender = user.sex;
                if(gender === "Female"){
                    gender = "Male";
                }
                else{
                    gender = "Female";
                }
                // console.log("gender in feed :",gender);
                let suggestions = [];
                let tag = [];
                tag.push(tag1);
                tag.push(tag2);
                tag.push(tag3);
                tag.push(tag4);
                tag.push(tag5);
                User.find((err,data)=>{
                    if(err){
                        console.log("error: ",err);
                    }
                    else{
                        //console.log(data);
                        data.forEach((userdata)=>{
                            if(userdata.id != id){  
                                let SendUser = false;
                                console.log(userdata.name,userdata.email,userdata.sex);
                                if((userdata.city===city || userdata.institution===institution || userdata.company===company)){
                                    if(userdata.sex === gender){
                                        console.log("This is gender under algo :",userdata.sex);
                                        SendUser = true;
                                    }
                                }
                                for(let i=0;i<=4;i++){
                                    for(let j=0;j<=4;j++){
                                        if((tag[i]===userdata.tags[j])){
                                            if(userdata.sex === gender){
                                                console.log("This is gender under algo :",userdata.sex);
                                                SendUser = true;
                                            }
                                        }
                                    }
                                } 
                                if(SendUser === true){
                                    var temp = {
                                        _id:userdata._id,
                                        name:userdata.name,
                                        email:userdata.email,
                                        age:userdata.age,
                                        sex:userdata.sex,
                                        tags:userdata.tags,
                                        about:userdata.about,
                                        city:userdata.city,
                                        company:userdata.company,
                                        institution:userdata.institution,
                                        uploadedimg:userdata.uploadedimg,
                                    }
                                    suggestions.push(temp);
                                }
                            }
                        })
                        // console.log("under this all your tag users are loged in",suggestions)
                        res.status(200).json({
                            suggestions,
                            message:"data retrieved succesfully"
                        })
                    }
                })
            }
        })
        
    }
    catch(err){
        next(err);
    }
}

module.exports.getimage = (req,res,next)=>{
    try{
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
                        var images = user.uploadedimg;
                        var id = user._id;
                        res.json({status:true ,images: images,id:id});
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
    catch(err){
        next(err);
    }
}

module.exports.deleteUsr = (req,res,next) =>{
    try{
        console.log(req.body.id);
        User.findByIdAndDelete(req.body.id).exec((err,docs)=>{
            if(err){
                res.status(400).json({statuscode:400});
            }
            else{
                console.log("user deleted succesfully");
                res.status(200).json({statuscode:200});
            }
        })
    }
    catch(err){
        next(err);
    }
}

module.exports.AddlikedUser = (req,res,next)=>{
    try{
        const {id, likedpl} = req.body;
        User.findById(id,(error,user)=>{
            if(error){
                return res.status(400).json({message:"failure"});
            }
            if(user){
                for(var i=0;i<likedpl.length;i++){
                    user.likedppl.push(likedpl[i]);
                }
            }
            user.save((err,data)=>{
                if(err){
                    return res.status(400).json({
                        message:"error in updation"
                    })
                }
                else{
                    return res.status(200).json({
                        message:"success"
                    });
                }
            });
        })
    }
    catch(err){
        next(err);
    }
}
