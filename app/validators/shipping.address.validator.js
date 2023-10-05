const { body, param } = require("express-validator");
const User = require("../models/user.model");
const ShippingAddress = require("../models/shipping.address.model");

exports.createShippingAddressValidator = [
    body("user_id").trim().notEmpty(),
    body("address_line1").trim().notEmpty(),
    body("address_line2").trim().notEmpty().optional(),
    body("city").trim().notEmpty(),
    body("province").trim().notEmpty(),
    body("country").trim().notEmpty(),
];
exports.getShippingAddressValidator = [
    param("shipping_address_id").trim().notEmpty(),
];
