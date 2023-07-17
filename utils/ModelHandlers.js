const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()


// jwt token 
const generateJwt = (id, email, username) =>{

    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      id: id,
      email: email,
      username: username,
      exp: parseInt(expiry.getTime() / 1000),
    },  process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'}); // DO NOT KEEP YOUR SECRET IN THE CODE!
}


// compare password
const comparePassword = async(enteredPassword, password) =>{
    return await bcrypt.compare(enteredPassword, password);
}

// Generatign Token
const getResetToken= async(resetPasswordToken, resetPasswordTime) =>{
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Hashing and adding resetPasswordToken to User
    resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    resetPasswordTime = Date.now() + 15 * 60 * 1000;
    
    return resetToken;
}


module.exports = { generateJwt, comparePassword, getResetToken }