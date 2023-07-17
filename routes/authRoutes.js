const express = require("express");
const router = express.router();
const AuthControllers = require("../controllers/authControllers")


router.post("/signup", AuthControllers.signup);

router.post("/login", AuthControllers.login);