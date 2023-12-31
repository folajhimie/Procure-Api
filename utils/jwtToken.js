require('dotenv').config()

// create token and saving that in cookies
const sendToken = (user,token,statusCode,res) =>{

    // const token = user.generateJwt()

    // Options for cookies
    const options = {
        expires: new Date(
           Date.now() + process.env.ACCESS_TOKEN_SECRET * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token",token,options).json({
       success: true,
       user,
       token
    });
}

module.exports = sendToken;