const { body, param } = require("express-validator");
const User = require("../models/user.model");

exports.signupValidator = [
    body("firstname").trim().notEmpty(),
    body("lastname").trim().notEmpty(),
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom(async (value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject(
                        "A user already exists with this email address"
                    );
                }
            });
        })
        .normalizeEmail(),
    body("password")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 8 })
        .withMessage("Password should at least 8 characters"),
];
exports.loginValidator = [
    body("email")
        .isEmail()
        .notEmpty()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password is required"),
];

exports.getUserValidator = [param("userId").trim().notEmpty()];
exports.deleteUserValidator = [param("userId").trim().notEmpty()];
exports.updateUserValidator = [
    param("userId").trim().notEmpty(),
    body("firstname").trim().notEmpty().optional(),
    body("lastname").trim().notEmpty().optional(),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .notEmpty()
        .optional()
        .withMessage("Password should at least 8 characters"),
    body("shipping_addresses").notEmpty().optional(),
    body("mobile_numbers").notEmpty().optional(),
];
