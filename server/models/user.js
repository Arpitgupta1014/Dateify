const mongoose = require("mongoose");


// uploaded image schema
const imgdetSchema = new mongoose.Schema({
    imgUrl: {
        type: String

    },
    likeCount: {
        type: Number,
        default: 0,
    },
    caption: {
        type: String
    }
})


// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: [true,"no data entry"],
        max:64
    },
    email: {
        type: String,
        trim:true,
        required: [true,"no data entry"],
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: [true,"no data entry"]
    },
    sex: {
        type:String
    },
    interest: {
        type:String
    },
    tags: [String],
    about: {
        type: String
    },
    profilepic: {
        type: String
    },
    uploadedimg: [imgdetSchema]
});

module.exports =  mongoose.model("User" , userSchema);
