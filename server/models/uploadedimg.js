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

module.exports =  mongoose.model("Uploade" , imgdetSchema);
