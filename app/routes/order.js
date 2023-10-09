var express = require("express");
const passport = require("passport");
const {
    createOrderValidator,
    getOrderByIdValidator,
    getOrdersByUserIdValidator,
    updateOrderValidator,
    deleteOrderValidator,
} = require("../validators/order.validator");
const {
    createOrder,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    deleteOrder,
} = require("../controllers/order.controller");

var router = express.Router();

// CREATE ORDER
router.post(
    "/",
    createOrderValidator,
    passport.authenticate("jwt", { session: false }),
    createOrder
);

// GET ORDER BY ID
router.get(
    "/:orderId",
    getOrderByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getOrderById
);

// GET ORDER BY USER ID
router.get(
    "/user/:userId",
    getOrdersByUserIdValidator,
    passport.authenticate("jwt", { session: false }),
    getOrdersByUserId
);

// UPDATE ORDER
router.put(
    "/:orderId",
    updateOrderValidator,
    passport.authenticate("jwt", { session: false }),
    updateOrder
);

// DELETE ORDER
router.delete(
    "/:orderId",
    deleteOrderValidator,
    passport.authenticate("jwt", { session: false }),
    deleteOrder
);

module.exports = router;
