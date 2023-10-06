var express = require("express");
const passport = require("passport");
const {
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    createCategory,
} = require("../controllers/category.controller");
const {
    getCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
    createCategoryValidator,
} = require("../validators/category.validator");
var router = express.Router();

// GET ALL CATEGORIES
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    getAllCategories
);

// GET CATEGORY BY ID
router.get(
    "/:categoryId",
    getCategoryValidator,
    passport.authenticate("jwt", { session: false }),
    getCategory
);

// GET CATEGORY BY ID
router.post(
    "/",
    createCategoryValidator,
    passport.authenticate("jwt", { session: false }),
    createCategory
);

// UPDATE CATEGORY
router.put(
    "/:categoryId",
    updateCategoryValidator,
    passport.authenticate("jwt", { session: false }),
    updateCategory
);

// DELETE CATEGORY
router.delete(
    "/:categoryId",
    deleteCategoryValidator,
    passport.authenticate("jwt", { session: false }),
    deleteCategory
);

module.exports = router;
