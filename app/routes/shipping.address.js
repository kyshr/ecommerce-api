var express = require("express");
const passport = require("passport");
const {
    createShippingAddressValidator,
} = require("../validators/shipping.address.validator");
const {
    createShippingAddress,
} = require("../controllers/shipping.address.controller");

var router = express.Router();

router.post(
    "/",
    createShippingAddressValidator,
    passport.authenticate("jwt", { session: false }),
    createShippingAddress
);
module.exports = router;
