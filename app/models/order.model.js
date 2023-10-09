const mongoose = require("mongoose");
const Product = require("./product.model");

const OrderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                total: {
                    type: Number,
                },
            },
        ],
        status: {
            type: String,
            default: "placed",
        },
        shipping_address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShippingAddress",
            required: true,
        },
        total: {
            type: Number,
        },
        payment_confirmation: {
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
OrderSchema.pre("save", async function (next) {
    try {
        let overallTotal = 0;

        const products = await Product.find({
            _id: { $in: this.items.map((item) => item.product_id) },
        });

        const items = this.items.map((item) => {
            const prod = products.filter(
                (pr) => pr._id.toString() === item.product_id.toString()
            );
            item.total = item.quantity * prod[0].price;
            overallTotal += item.total;
            return item;
        });

        this.items = items;
        this.total = overallTotal;
        next();
    } catch (error) {
        next(error);
    }
});
OrderSchema.pre("updateOne", async function (next) {
    try {
        let overallTotal = 0;
        const modifiedFields = this.getUpdate().$set;
        if (modifiedFields.items && modifiedFields.items.length > 0) {
            const products = await Product.find({
                _id: {
                    $in: modifiedFields.items.map((item) => item.product_id),
                },
            });

            const items = modifiedFields.items.map((item) => {
                const prod = products.filter(
                    (pr) => pr._id.toString() === item.product_id.toString()
                );
                item.total = item.quantity * prod[0].price;
                console.log(item.total);
                overallTotal += item.total;
                return item;
            });
            console.log(overallTotal);

            this.getUpdate().$set.items = items;
            this.getUpdate().$set.total = overallTotal;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Order", OrderSchema);
