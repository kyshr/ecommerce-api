const mongoose = require("mongoose");
const Rating = require("./rating.model");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "PHP",
        },
        quantity: {
            type: Number,
            required: true,
        },
        images: [
            {
                type: String,
            },
        ],
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        ratings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Rating",
            },
        ],
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        average_rating: {
            type: Number,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);
ProductSchema.pre("updateOne", async function (next) {
    try {
        let total = 0;

        if (this.getUpdate().$push.ratings) {
            const newRating = await Rating.findById(
                this.getUpdate().$push.ratings
            );
            const ratings = await Rating.find({
                product_id: newRating.product_id,
            });
            ratings.forEach((rating) => {
                total += rating.rating;
            });

            let average = total / ratings.length;
            this.getUpdate().$set.average_rating = average;
        }

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Product", ProductSchema);
