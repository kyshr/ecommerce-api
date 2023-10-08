const Order = require("../models/order.model");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const newOrder = await Order.create(data);
        return res
            .status(200)
            .json({ message: "Order created.", data: newOrder });
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.orderId;
        const order = await Order.findOne({ _id: id })
            .populate("items.product_id", "-quantity")
            .populate("shipping_address", "-user_id");

        return res.status(200).json({ data: order });
    } catch (error) {
        next(error);
    }
};

exports.getOrdersByUserId = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.userId;
        const paymentConfirmation = req.query.paymentConfirmation || false;
        const status = req.query.status || "";

        const orders = await Order.find({
            $and: [
                { user_id: id },
                { payment_confirmation: paymentConfirmation },
                status.length ? { status: status } : {},
            ],
        })
            .populate("items.product_id", "-quantity")
            .populate("shipping_address", "-user_id");

        return res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
};

exports.updateOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.orderId;

        const updatedOrder = await Order.updateOne({ _id: id }, { $set: data });

        return res
            .status(200)
            .json({ message: "Order updated", data: updatedOrder });
    } catch (error) {
        next(error);
    }
};

exports.deleteOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.orderId;
        const deletedOrder = await Order.deleteOne({ _id: id });

        return res.status(200).json({ data: deletedOrder });
    } catch (error) {
        next(error);
    }
};
