var express = require("express");
const passport = require("passport");
const {
    createCartValidator,
    getCartByIdValidator,
    getCartsByUserIdValidator,
    updateCartValidator,
    deleteCartValidator,
    updateCartAfterCheckoutValidator,
} = require("../validators/cart.validator");
const {
    getCartById,
    updateCart,
    deleteCart,
    createCart,
    getCartsByUserId,
    updateCartAfterCheckout,
} = require("../controllers/cart.controller");
var router = express.Router();

// CREATE CART
router.post(
    "/",
    createCartValidator,
    passport.authenticate("jwt", { session: false }),
    createCart
);

// GET CART BY ID
router.get(
    "/:cartId",
    getCartByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getCartById
);

// GET CART BY USER ID
router.get(
    "/user/:userId",
    getCartsByUserIdValidator,
    passport.authenticate("jwt", { session: false }),
    getCartsByUserId
);

// UPDATE CART
router.put(
    "/:cartId",
    updateCartValidator,
    passport.authenticate("jwt", { session: false }),
    updateCart
);

// UPDATE CART AFTER CHECKOUT
router.put(
    "/after/checkout",
    updateCartAfterCheckoutValidator,
    passport.authenticate("jwt", { session: false }),
    updateCartAfterCheckout
);

// DELETE CART
router.delete(
    "/:cartId",
    deleteCartValidator,
    passport.authenticate("jwt", { session: false }),
    deleteCart
);

module.exports = router;
