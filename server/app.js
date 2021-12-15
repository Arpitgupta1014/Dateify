const express = require('express');
const cors = require('cors');
require('dotenv').config();// to use env variables..
const mongoose = require("./db/connectDB");
const app = express();

// import routers
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

// middlewares
app.use('/api',authRoutes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})