const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const messageRoute = require("./Routes/MessageRouter");
const app = express();
const cookieParser = require("cookie-parser");


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});

const URI = process.env.DATABASE;
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DB connection Succesfull");
}).catch((err)=>{
    console.log(err.message);
});

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use("/",authRoutes);
app.use("/api/messages",messageRoute);
