const { body, param } = require("express-validator");

exports.createCategoryValidator = [body("name").trim().notEmpty()];
exports.getCategoryValidator = [param("categoryId").trim().notEmpty()];
exports.deleteCategoryValidator = [param("categoryId").trim().notEmpty()];
exports.updateCategoryValidator = [
    param("categoryId").trim().notEmpty(),
    body("name").trim().notEmpty(),
];
