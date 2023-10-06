const Product = require("../models/product.model");
const { validationResult } = require("express-validator");
const auth = require("../utils/auth");

exports.createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    if (!req.files) {
        const error = new Error("No image provided.");
        error.statusCode = 422;
        return next(error);
    }
    try {
        const data = req.body;
        const imageFiles = req.files;

        const images = imageFiles.map((img) => {
            const path = img.path;
            return path.replaceAll("\\", "/");
        });

        data.images = images;

        const newProduct = await Product.create(data);
        return res
            .status(200)
            .json({ message: "Product created.", data: newProduct });
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Signup failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.productId;
        const product = await Product.findOne({ _id: id });

        return res.status(200).json({ data: product });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.productId;
        const deletedProduct = await Product.deleteOne({ _id: id });

        return res.status(200).json({ data: deletedProduct });
    } catch (error) {
        next(error);
    }
};
