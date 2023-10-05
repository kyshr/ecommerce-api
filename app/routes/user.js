var express = require("express");
const passport = require("passport");
const {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
} = require("../controllers/user.controller");
const {
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
} = require("../validators/user.validator");
var router = express.Router();

// GET ALL USERS
router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);

// GET USER BY ID
router.get(
    "/:userId",
    getUserValidator,
    passport.authenticate("jwt", { session: false }),
    getUser
);

// UPDATE USER
router.put(
    "/:userId",
    updateUserValidator,
    passport.authenticate("jwt", { session: false }),
    updateUser
);

// DELETE USER
router.delete(
    "/:userId",
    deleteUserValidator,
    passport.authenticate("jwt", { session: false }),
    deleteUser
);

module.exports = router;
