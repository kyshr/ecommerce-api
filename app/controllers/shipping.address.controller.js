const User = require("../models/user.model");
const ShippingAddress = require("../models/shipping.address.model");
const { validationResult } = require("express-validator");

// GET SHIPPING ADDRESS BY ID
exports.getShippingAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.shippingAddressId;
        const shippingAddress = await ShippingAddress.findOne({ _id: id });
        return res.status(200).json({ data: shippingAddress });
    } catch (error) {
        return next(error);
    }
};

// GET SHIPPING ADDRESS BY USER ID
exports.getShippingAddressByUserId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.userId;
        const shippingAddress = await ShippingAddress.find({ user_id: id });
        return res.status(200).json({ data: shippingAddress });
    } catch (error) {
        return next(error);
    }
};

//CREATE SHIPPING ADDRESS
exports.createShippingAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.body.user_id;

        const shippingAddress = await ShippingAddress.create(data);
        if (shippingAddress) {
            await User.updateOne(
                { _id: id },
                {
                    $push: {
                        shipping_addresses: shippingAddress._id,
                    },
                }
            );
        }
        return res.status(200).json({ data: shippingAddress });
    } catch (error) {
        return next(error);
    }
};

// UPDATE SHIPPING ADDRESS
exports.updateShippingAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.shippingAddressId;

        const updatedShippingAddress = await ShippingAddress.updateOne(
            { _id: id },
            { $set: data }
        );
        return res.status(200).json({ data: updatedShippingAddress });
    } catch (error) {
        return next(error);
    }
};

//DELETE SHIPPING ADDRESS
exports.deleteShippingAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.shippingAddressId;
        const deletedShippingAddress = await ShippingAddress.findOneAndDelete({
            _id: id,
        });
        if (deletedShippingAddress) {
            await User.updateOne(
                { _id: deletedShippingAddress.user_id },
                {
                    $pull: {
                        shipping_addresses: deletedShippingAddress._id,
                    },
                }
            );
        }
        return res.status(200).json({ data: deletedShippingAddress });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
