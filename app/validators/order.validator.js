const { body, param, query } = require("express-validator");

exports.createOrderValidator = [
    body("user_id").trim().notEmpty(),
    body("items").notEmpty(),
    body("shipping_address").trim().notEmpty(),
];
exports.getOrderByIdValidator = [param("orderId").trim().notEmpty()];
exports.getOrdersByUserIdValidator = [
    param("userId").trim().notEmpty(),
    query("paymentConfirmation").trim().notEmpty().optional(),
    query("status").trim().notEmpty().optional(),
];
exports.deleteOrderValidator = [param("orderId").trim().notEmpty()];
exports.updateOrderValidator = [
    param("orderId").trim().notEmpty().optional(),
    body("userId").trim().notEmpty().optional(),
    body("items").notEmpty().optional(),
    body("shipping_address").notEmpty().optional(),
    body("payment_confirmation").isBoolean().notEmpty().optional(),
    body("status").trim().notEmpty().optional(),
    body("total").trim().isNumeric().notEmpty().optional(),
];
exports.updateOrderAfterCheckoutValidator = [body("orderIds").notEmpty()];
