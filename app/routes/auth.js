var express = require("express");
const passport = require("passport");
const {
    signupValidator,
    loginValidator,
} = require("../validators/user.validator");
const { signup, login } = require("../controllers/auth.controller");
var router = express.Router();

// SIGNUP
router.post("/signup", signupValidator, signup);

// LOGIN
router.post("/login", loginValidator, login);

module.exports = router;
