const { body, param, query } = require("express-validator");

exports.createCartValidator = [
    body("user_id").trim().notEmpty(),
    body("product_id").trim().notEmpty(),
    body("quantity").trim().isNumeric(),
];
exports.getCartByIdValidator = [param("cartId").trim().notEmpty()];
exports.getCartsByUserIdValidator = [
    param("userId").trim().notEmpty(),
    query("checkout").trim().notEmpty().optional(),
];
exports.deleteCartValidator = [param("cartId").trim().notEmpty()];
exports.updateCartValidator = [
    param("cartId").trim().notEmpty().optional(),
    body("userId").trim().notEmpty().optional(),
    body("productId").trim().notEmpty().optional(),
    body("quantity").trim().isNumeric().optional(),
];
exports.updateCartAfterCheckoutValidator = [body("cartIds").notEmpty()];
