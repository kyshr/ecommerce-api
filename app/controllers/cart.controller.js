const Cart = require("../models/cart.model");
const { validationResult } = require("express-validator");

exports.createCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const newCartItem = await Cart.create(data);
        return res
            .status(200)
            .json({ message: "Cart created.", data: newCartItem });
    } catch (error) {
        next(error);
    }
};

exports.getCartById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.cartId;
        const cart = await Cart.findOne({ _id: id }).populate(
            "product_id",
            "-quantity"
        );

        return res.status(200).json({ data: cart });
    } catch (error) {
        next(error);
    }
};

exports.getCartsByUserId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.userId;
        const checkout = req.query.checkout || false;

        const carts = await Cart.find({
            user_id: id,
            checkout: checkout,
        }).populate("product_id", "-quantity");

        return res.status(200).json({ data: carts });
    } catch (error) {
        next(error);
    }
};

exports.updateCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.cartId;

        const updatedCart = await Cart.updateOne({ _id: id }, { $set: data });

        return res
            .status(200)
            .json({ message: "Cart updated", data: updatedCart });
    } catch (error) {
        next(error);
    }
};

exports.updateCartAfterCheckout = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const cartIds = req.body.cartIds;
        console.log("Cart IDS", cartIds);
        const updatedCart = await Cart.updateMany(
            {
                _id: {
                    $in: cartIds,
                },
            },
            {
                $set: {
                    checkout: true,
                },
            }
        );

        return res
            .status(200)
            .json({ message: "Cart updated", data: updatedCart });
    } catch (error) {
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.cartId;
        const deletedCart = await Cart.deleteOne({ _id: id });

        return res.status(200).json({ data: deletedCart });
    } catch (error) {
        next(error);
    }
};
