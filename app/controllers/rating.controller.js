const { validationResult } = require("express-validator");
const Rating = require("../models/rating.model");

exports.createRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const data = req.body;
        const newRating = await Rating.create(data);

        return res
            .status(200)
            .json({ message: "Rating added.", data: newRating });
    } catch (error) {
        next(error);
    }
};
exports.getRatingById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const id = req.params.ratingId;
        const rating = await Rating.findOne({ _id: id }).populate([
            "user_id",
            "product_id",
        ]);

        return res.status(200).json({ data: rating });
    } catch (error) {
        next(error);
    }
};
exports.getRatings = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const ratings = await Rating.find();

        return res.status(200).json({
            data: ratings,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const data = req.body;
        const id = req.params.ratingId;

        const updatedRating = await Rating.updateOne({ _id: id }, data);

        return res
            .status(200)
            .json({ message: "Rating updated", data: updatedRating });
    } catch (error) {
        next(error);
    }
};

exports.deleteRating = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const id = req.params.ratingId;
        const deletedRating = await Rating.deleteOne({ _id: id });

        return res.status(200).json({ data: deletedRating });
    } catch (error) {
        next(error);
    }
};
