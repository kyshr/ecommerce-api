const { body, param, query } = require("express-validator");

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
exports.getProductsValidator = [
    query("name").trim().notEmpty().optional(),
    query("categories").trim().notEmpty().optional(),
    query("tags").trim().notEmpty().optional(),
];
exports.deleteProductValidator = [param("productId").trim().notEmpty()];
exports.updateProductValidator = [
    param("productId").trim().notEmpty(),
    body("name").trim().notEmpty().optional(),
    body("description").trim().notEmpty().optional(),
    body("price").trim().isNumeric().optional(),
    body("currency").trim().notEmpty().optional(),
    body("quantity").trim().isNumeric().optional(),
    body("deletedImages").notEmpty().optional(),
    body("categories").notEmpty().optional(),
    body("tags").notEmpty().optional(),
];
