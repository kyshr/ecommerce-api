var express = require("express");
const passport = require("passport");
const {
    createRating,
    getRatings,
    getRatingById,
    updateRating,
    deleteRating,
} = require("../controllers/rating.controller");
const {
    createRatingValidator,
    getRatingsByIdValidator,
    updateRatingValidator,
    deleteRatingValidator,
} = require("../validators/rating.validator");
var router = express.Router();

// CREATE RATING
router.post(
    "/",
    createRatingValidator,
    passport.authenticate("jwt", { session: false }),
    createRating
);

// GET RATINGS
router.get("/", passport.authenticate("jwt", { session: false }), getRatings);

// GET RATING BY ID
router.get(
    "/:ratingId",
    getRatingsByIdValidator,
    passport.authenticate("jwt", { session: false }),
    getRatingById
);

// UPDATE RATING
router.put(
    "/:ratingId",
    updateRatingValidator,
    passport.authenticate("jwt", { session: false }),
    updateRating
);

// DELETE RATING
router.delete(
    "/:ratingId",
    deleteRatingValidator,
    passport.authenticate("jwt", { session: false }),
    deleteRating
);

module.exports = router;
