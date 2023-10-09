const { validationResult } = require("express-validator");
const Review = require("../models/review.model");
const Product = require("../models/product.model");

exports.createReview = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create review failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const data = req.body;
        const newReview = await Review.create(data);

        if (newReview) {
            await Product.updateOne(
                { _id: data.product_id },
                {
                    $push: {
                        reviews: newReview._id,
                    },
                }
            );
        }

        return res
            .status(200)
            .json({ message: "Review added.", data: newReview });
    } catch (error) {
        next(error);
    }
};

exports.getReviewById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Get review failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const id = req.params.reviewId;

        const review = await Review.findOne({ _id: id }).populate([
            "user_id",
            "product_id",
        ]);

        return res.status(200).json({ data: review });
    } catch (error) {
        next(error);
    }
};

exports.getReviews = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Get reviews failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const reviews = await Review.find();

        return res.status(200).json({
            data: reviews,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateReview = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const data = req.body;
        const id = req.params.reviewId;

        const updatedReview = await Review.updateOne({ _id: id }, data);

        return res
            .status(200)
            .json({ message: "Review updated", data: updatedReview });
    } catch (error) {
        next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    try {
        const id = req.params.reviewId;

        const deletedReview = await Review.deleteOne({ _id: id });

        return res.status(200).json({ data: deletedReview });
    } catch (error) {
        next(error);
    }
};
