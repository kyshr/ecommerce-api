const { body, param, query } = require("express-validator");

exports.createReviewValidator = [
    body("review").trim().notEmpty(),
    body("user_id").trim().notEmpty(),
    body("product_id").trim().notEmpty(),
];
exports.getReviewByIdValidator = [param("reviewId").trim().notEmpty()];
exports.updateReviewValidator = [
    param("reviewId").trim().notEmpty(),
    body("review").trim().notEmpty(),
];
exports.deleteReviewValidator = [param("reviewId").trim().notEmpty()];
