const User = require("../models/user.model");
const ShippingAddress = require("../models/shipping.address.model");
const auth = require("../utils/auth");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
