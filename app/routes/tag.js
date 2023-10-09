var express = require("express");
const passport = require("passport");
const {
    getTag,
    updateTag,
    deleteTag,
    getAllTags,
    createTag,
} = require("../controllers/tag.controller");
const {
    getTagValidator,
    updateTagValidator,
    deleteTagValidator,
    createTagValidator,
} = require("../validators/tag.validator");
var router = express.Router();

// GET ALL TAGS
router.get("/", passport.authenticate("jwt", { session: false }), getAllTags);

// GET TAG BY ID
router.get(
    "/:tagId",
    getTagValidator,
    passport.authenticate("jwt", { session: false }),
    getTag
);

// CREATE TAG
router.post(
    "/",
    createTagValidator,
    passport.authenticate("jwt", { session: false }),
    createTag
);

// UPDATE TAG
router.put(
    "/:tagId",
    updateTagValidator,
    passport.authenticate("jwt", { session: false }),
    updateTag
);

// DELETE TAG
router.delete(
    "/:tagId",
    deleteTagValidator,
    passport.authenticate("jwt", { session: false }),
    deleteTag
);

module.exports = router;
