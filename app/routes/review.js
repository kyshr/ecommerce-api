var express = require("express");
const passport = require("passport");
const {
    createReviewValidator,
    getReviewByIdValidator,
    updateReviewValidator,
    deleteReviewValidator,
} = require("../validators/review.validator");
const {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview,
} = require("../controllers/review.controller");
var router = express.Router();

// CREATE REVIEW
router.post(
    "/",
    createReviewValidator,
    passport.authenticate("jwt", { session: false }),
    createReview
);

// GET REVIEWS
router.get("/", passport.authenticate("jwt", { session: false }), getReviews);

// GET REVIEW BY ID
router.get(
    "/:reviewId",
    getReviewByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getReviewById
);

// UDPATE REVIEW
router.put(
    "/:reviewId",
    updateReviewValidator,
    passport.authenticate("jwt", { session: false }),
    updateReview
);

// DELETE REVIEW
router.delete(
    "/:reviewId",
    deleteReviewValidator,
    passport.authenticate("jwt", { session: false }),
    deleteReview
);

module.exports = router;
