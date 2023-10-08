const Product = require("../models/product.model");
const { validationResult } = require("express-validator");
const { clearImage } = require("../utils/image");

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
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.productId;
        const product = await Product.findOne({ _id: id }).populate([
            "tags",
            "categories",
        ]);

        return res.status(200).json({ data: product });
    } catch (error) {
        next(error);
    }
};
exports.getProducts = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const name = req.query.name || "";
        const categories = req.query.categories || [];
        const tags = req.query.tags || [];
        const searchTerms = name.split(" ");
        const regexPatterns = searchTerms.map((term) => new RegExp(term, "i"));

        const pageLength = req.query.pageLength || 30;
        const pageNumber = req.query.pageNumber || 1;

        const filter = {
            $and: [
                {
                    $and: regexPatterns.map((pattern) => ({
                        name: { $regex: pattern },
                    })),
                },
                categories.length ? { categories: { $in: categories } } : {},
                tags.length ? { tags: { $in: tags } } : {},
            ],
        };

        const totalProducts = await Product.countDocuments(filter);
        const totalPages =
            pageLength > totalProducts ? 1 : totalProducts / pageLength;

        const products = await Product.find(filter)
            .skip(pageNumber === 1 ? 0 : (pageNumber - 1) * pageLength)
            .limit(pageLength)
            .populate(["categories", "tags"]);

        return res.status(200).json({
            data: products,
            totalPages: totalPages,
            currentPage: parseInt(pageNumber),
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.productId;
        const imageFiles = req.files || [];
        const deletedImages = data.deletedImages || [];
        let newImages = [];

        delete data.deletedImages;

        if (imageFiles.length > 0) {
            newImages = imageFiles.map((img) => {
                const path = img.path;
                return path.replaceAll("\\", "/");
            });
        }

        if (newImages.length > 0) {
            await Product.updateOne(
                { _id: id },
                {
                    $set: data,
                    $push: {
                        images: {
                            $each: newImages,
                        },
                    },
                }
            );
        } else {
            await Product.updateOne(
                { _id: id },
                {
                    $set: data,
                }
            );
        }

        if (deletedImages.length > 0) {
            deletedImages.forEach((img) => {
                clearImage(img);
            });
        }

        const updatedImages = await Product.updateOne(
            { _id: id },
            {
                $pullAll: {
                    images: deletedImages,
                },
            }
        );

        return res
            .status(200)
            .json({ message: "Product updated", data: updatedImages });
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
