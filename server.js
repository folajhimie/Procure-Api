const express = require('express');
const app = express();
require('dotenv').config()

const connectDB = require('./database/connect');
const PORT = process.env.PORT || 4545;

const start = async() => {
    try {
        await connectDB();
        console.log("DB connected successfully...");
        app.listen(process.env.PORT, ()=> {
            console.log(`server is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("error has occured: ", err.message);
    }
}

start()