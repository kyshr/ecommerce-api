const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        checkout: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = mongoose.model("Cart", CartSchema);
