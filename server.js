const express = require('express');
const app = express();
require('dotenv').config()

const cors = require("cors");
const connectDB = require('./database/connect');
const PORT = process.env.PORT || 4545;


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MYSQL application." });
});


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