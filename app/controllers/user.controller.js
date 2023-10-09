const User = require("../models/user.model");
const auth = require("../utils/auth");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.userId;
        const user = await User.findOne({ _id: id }).select("-password");
        return res.status(200).json({ data: user });
    } catch (error) {
        return next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ data: users });
    } catch (error) {
        return next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.userId;
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await User.updateOne(
            { _id: id },
            { $set: data }
        ).select("-password");
        return res.status(200).json({ data: updatedUser });
    } catch (error) {
        return next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.userId;
        const deletedUser = await User.deleteOne({ _id: id });
        return res.status(200).json({ data: deletedUser });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
