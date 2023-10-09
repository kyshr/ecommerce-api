const Category = require("../models/category.model");
const { validationResult } = require("express-validator");

exports.createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const category = await Category.create(data);

        return res.status(200).json({ data: category });
    } catch (error) {
        return next(error);
    }
};

exports.getCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.categoryId;
        const category = await Category.findOne({ _id: id });
        return res.status(200).json({ data: category });
    } catch (error) {
        return next(error);
    }
};

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ data: categories });
    } catch (error) {
        return next(error);
    }
};

exports.updateCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.categoryId;
        const updatedCategory = await Category.updateOne(
            { _id: id },
            { $set: data }
        );
        return res.status(200).json({ data: updatedCategory });
    } catch (error) {
        return next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.categoryId;
        const deletedCategory = await Category.deleteOne({ _id: id });
        return res.status(200).json({ data: deletedCategory });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
