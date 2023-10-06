var express = require("express");
const passport = require("passport");
const {
    createProduct,
    getProductById,
    deleteProduct,
} = require("../controllers/product.controller");
const {
    createProductValidator,
    getProductByIdValidator,
    deleteProductValidator,
} = require("../validators/product.validator");
var router = express.Router();

// CREATE PRODUCT
router.post(
    "/",
    createProductValidator,
    passport.authenticate("jwt", { session: false }),
    createProduct
);

// GET PRODUCT BY ID
router.get(
    "/:productId",
    getProductByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getProductById
);

// DELETE PRODUCT
router.delete(
    "/:productId",
    deleteProductValidator,
    passport.authenticate("jwt", { session: false }),
    deleteProduct
);

module.exports = router;
