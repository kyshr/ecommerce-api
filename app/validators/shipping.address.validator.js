const { body, param } = require("express-validator");

exports.createShippingAddressValidator = [
    body("user_id").trim().notEmpty(),
    body("address_line1").trim().notEmpty(),
    body("address_line2").trim().notEmpty().optional(),
    body("city").trim().notEmpty(),
    body("province").trim().notEmpty(),
    body("country").trim().notEmpty(),
];

exports.getShippingAddressValidator = [
    param("shippingAddressId").trim().notEmpty(),
];

exports.getShippingAddressByUserIdValidator = [
    param("userId").trim().notEmpty(),
];

exports.deleteShippingAddressValidator = [
    param("shippingAddressId").trim().notEmpty(),
];

exports.updateShippingAddressValidator = [
    param("shippingAddressId").trim().notEmpty(),
    body("address_line1").trim().notEmpty().optional(),
    body("address_line2").trim().notEmpty().optional(),
    body("city").notEmpty().optional(),
    body("province").notEmpty().optional(),
    body("country").notEmpty().optional(),
];
