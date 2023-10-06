const { body, param } = require("express-validator");

exports.createProductValidator = [
    body("name").trim().notEmpty(),
    body("description").trim().notEmpty(),
    body("price").trim().isNumeric(),
    body("currency").trim().notEmpty().optional(),
    body("quantity").trim().isNumeric(),
    body("images").notEmpty().optional(),
    body("categories").notEmpty().optional(),
    body("tags").notEmpty().optional(),
];
exports.getProductByIdValidator = [param("productId").trim().notEmpty()];
exports.deleteProductValidator = [param("productId").trim().notEmpty()];
exports.updateProductValidator = [
    param("productId").trim().notEmpty(),
    body("name").trim().notEmpty(),
];
