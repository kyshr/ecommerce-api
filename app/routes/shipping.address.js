var express = require("express");
const passport = require("passport");
const {
    createShippingAddressValidator,
    updateShippingAddressValidator,
    getShippingAddressValidator,
    deleteShippingAddressValidator,
    getShippingAddressByUserIdValidator,
} = require("../validators/shipping.address.validator");
const {
    createShippingAddress,
    updateShippingAddress,
    getShippingAddress,
    deleteShippingAddress,
    getShippingAddressByUserId,
} = require("../controllers/shipping.address.controller");

var router = express.Router();

router.get(
    "/:shippingAddressId",
    getShippingAddressValidator,
    passport.authenticate("jwt", { session: false }),
    getShippingAddress
);

router.get(
    "/user/:userId",
    getShippingAddressByUserIdValidator,
    passport.authenticate("jwt", { session: false }),
    getShippingAddressByUserId
);

router.post(
    "/",
    createShippingAddressValidator,
    passport.authenticate("jwt", { session: false }),
    createShippingAddress
);
router.put(
    "/:shippingAddressId",
    updateShippingAddressValidator,
    passport.authenticate("jwt", { session: false }),
    updateShippingAddress
);

router.delete(
    "/:shippingAddressId",
    deleteShippingAddressValidator,
    passport.authenticate("jwt", { session: false }),
    deleteShippingAddress
);
module.exports = router;
