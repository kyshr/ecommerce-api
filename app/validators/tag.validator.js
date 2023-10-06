const { body, param } = require("express-validator");

exports.createTagValidator = [body("name").trim().notEmpty()];
exports.getTagValidator = [param("tagId").trim().notEmpty()];
exports.deleteTagValidator = [param("tagId").trim().notEmpty()];
exports.updateTagValidator = [
    param("tagId").trim().notEmpty(),
    body("name").trim().notEmpty(),
];
