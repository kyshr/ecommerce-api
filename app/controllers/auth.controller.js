const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const auth = require("../utils/auth");

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const newUser = await User.create(data);
        // newUser.populate("shipping_addresses");

        // console.log(newUser);

        return res.status(201).json({
            message: "New user created",
            data: {
                _id: newUser._id,
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            },
        });
    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Login failed.");
        error.statusCode = 401;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        if (user) {
            const validPassword = await user.isValidPassword(data.password);
            if (validPassword) {
                return res.status(200).json({
                    message: "Login successful",
                    data: {
                        access_token: auth.createToken({
                            _id: user._id,
                        }),
                    },
                });
            }
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            return next(error);
        } else {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
};
