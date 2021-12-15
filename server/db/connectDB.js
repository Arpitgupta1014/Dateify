const mongoose = require('mongoose');
const User = require('../models/user');

// connect to db
const URI = process.env.DATABASE;
mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB connected established"))
.catch(err => console.log("DB connection error: ",err));
