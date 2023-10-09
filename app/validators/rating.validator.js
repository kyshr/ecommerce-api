const { body, param, query } = require("express-validator");

exports.createRatingValidator = [
    body("rating").trim().isNumeric().notEmpty(),
    body("user_id").trim().notEmpty(),
    body("product_id").trim().notEmpty(),
];

exports.getRatingsByIdValidator = [param("ratingId").trim().notEmpty()];

exports.updateRatingValidator = [
    param("ratingId").trim().notEmpty(),
    body("data").trim().notEmpty(),
];

exports.deleteRatingValidator = [param("ratingId").trim().notEmpty()];
