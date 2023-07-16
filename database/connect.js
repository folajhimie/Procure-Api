// const mysql = require("mysql");
// const {Sequelize} = require('sequelize');
const Sequelize = require('sequelize');
require("dotenv").config();

// const sequelize = new Sequelize('reporite', 'root', 'olabisi12', {
//   host: 'localhost',
//   dialect: 'mysql', // or any other dialect
// });


const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST_USER,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);



const connectDB = async() => {
    try {
        await sequelize.authenticate()
        console.log('Connected to MySQL database!');
        return;   
    } catch (err) {
        console.error('Error connecting to MySQL database: ', err.message);
    }
}

  


// const connection = mysql.createConnection({
//   host: process.env.DB_HOST_USER,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });


// const connectDB = () => {
//     connection.connect((err) => {
//         if (err) {
//           console.error('Error connecting to MySQL database: ', err.message);
//           return;
//         }
//         console.log('Connected to MySQL database!');
//     });

// }

  
module.exports = {connectDB, sequelize};