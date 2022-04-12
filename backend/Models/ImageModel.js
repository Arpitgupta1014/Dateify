const mongoose = require("mongoose");

// uploaded image schema
const imgdetSchema = new mongoose.Schema({
    imgUrl: {
        type: String

    },
    caption: {
        type: String
    }
})

module.exports =  mongoose.model("Uploade" , imgdetSchema);
