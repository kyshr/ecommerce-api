var express = require("express");
const passport = require("passport");
const {
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    getProducts,
} = require("../controllers/product.controller");
const {
    createProductValidator,
    getProductByIdValidator,
    deleteProductValidator,
    updateProductValidator,
    getProductsValidator,
} = require("../validators/product.validator");
var router = express.Router();

// CREATE PRODUCT
router.post(
    "/",
    createProductValidator,
    passport.authenticate("jwt", { session: false }),
    createProduct
);

// GET PRODUCTS
router.get(
    "/",
    getProductsValidator,
    passport.authenticate("jwt", { session: false }),
    getProducts
);

// GET PRODUCT BY ID
router.get(
    "/:productId",
    getProductByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getProductById
);

// UPDATE PRODUCT
router.put(
    "/:productId",
    updateProductValidator,
    passport.authenticate("jwt", { session: false }),
    updateProduct
);

// DELETE PRODUCT
router.delete(
    "/:productId",
    deleteProductValidator,
    passport.authenticate("jwt", { session: false }),
    deleteProduct
);

module.exports = router;
