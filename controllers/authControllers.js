const user = require("../models/userModel");
const db = require("../models/index");
const User = db.user;
const Op = db.Sequelize.Op;
const sendToken = require('../utils/jwtToken');
const catchAsyncErrors = require('../utils/ErrorHandler')
const ErrorHandler = require("../utils/ErrorHandler")

const signup = catchAsyncErrors(async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Empty Input Fields'
            })
        }

        var regExName = /^[a-zA-Z ]*$/;

        if (!regExName.test(username)) {
            return res.status(400).json({
                status: false,
                message: "Invalid username Entered!!"
            })
        }

        if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Invalid email Entered!!"
            })
        }

        if (password.length < 5) {
            return res.status(400).json({
                status: false,
                message: "Password is too Short!!"
            })
        }

        const checkUser = await User.findOne({ where: { email } });

        if (checkUser)
            return res.status(401).json({ status: false, message: "User already exist." })

        
        let newUser = await User.create({ 
            username, 
            email, 
            password 
        })

        sendToken(newUser, 200, res);
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const login = catchAsyncErrors(async (req, res, next) => {
    const { password, email } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: 'Empty Input Fields'
            })
        }

        const checkUser = await User.findOne({ where: { email } });

        if (!checkUser) {
            return next(
              new ErrorHandler("User is not find with this email & password", 401)
            );
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(
              new ErrorHandler("User is not find with this email & password", 401)
            );
        }

        sendToken(checkUser, 200, res);
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


module.exports = { signup, login }