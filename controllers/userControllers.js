const user = require("../models/userModel");

const db = require("../models/index");
const User = db.user;
const Op = db.Sequelize.Op;
const sendToken = require('../utils/jwtToken')

const signup = async (req, res) => {
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

        const checkUser = await User.findOne({ email });

        if (checkUser)
            return res.status(401).json({ status: false, message: "User already exist." })

        
        let newUser = await User.create({ 
            username, 
            email, 
            password 
        })

        sendToken(newUser, 200, res);
    } catch {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res, next) => {
    try {
        const prisma = new PrismaClient();
        const { email, password } = req.body;
        if (email && password) {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return res.status(404).send("User not found");
            }

            const auth = await compare(password, user.password);
            if (!auth) {
                return res.status(400).send("Invalid Password");
            }

            return res.status(200).json({
                user: { id: user?.id, email: user?.email },
                jwt: createToken(email, user.id),
            });
        } else {
            return res.status(400).send("Email and Password Required");
        }
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = { signup, login }