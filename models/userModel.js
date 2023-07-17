const { sequelize } = require('../database/connect');
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const User = sequelize.define("user", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        resetPasswordToken: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        resetPasswordTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// User.methods.setPassword = function(password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// };

// User.methods.validPassword = function(password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
//     return this.hash === hash;
// };


// Hash Password
User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    this.password = hashedPassword;
});

// jwt token 
// User.methods.generateJwt(async () => {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);

//     return jwt.sign({
//       id: this.id,
//       email: this.email,
//       username: this.username,
//       exp: parseInt(expiry.getTime() / 1000),
//     },  process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'}); // DO NOT KEEP YOUR SECRET IN THE CODE!
// });

// // compare password
// User.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// // Forgot Password
// User.methods.getResetToken (async () => {
//     // Generatign Token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hashing and adding resetPasswordToken to User
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// })


  
// User.afterValidate('myHookAfter', (user, options) => {
//     user.username = 'Toni';
// });

module.exports = User;