const Tag = require("../models/tag.model");
const { validationResult } = require("express-validator");

exports.createTag = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Create failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const tag = await Tag.create(data);

        return res.status(200).json({ data: tag });
    } catch (error) {
        return next(error);
    }
};

exports.getTag = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Fetch failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.tagId;
        const tag = await Tag.findOne({ _id: id });
        return res.status(200).json({ data: tag });
    } catch (error) {
        return next(error);
    }
};

exports.getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.find();
        return res.status(200).json({ data: tags });
    } catch (error) {
        return next(error);
    }
};

exports.updateTag = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Update failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const data = req.body;
        const id = req.params.tagId;
        const updatedTag = await Tag.updateOne({ _id: id }, { $set: data });
        return res.status(200).json({ data: updatedTag });
    } catch (error) {
        return next(error);
    }
};

exports.deleteTag = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Delete failed.");
        error.statusCode = 400;
        error.data = errors.array();
        return next(error);
    }
    try {
        const id = req.params.tagId;
        const deletedTag = await Tag.deleteOne({ _id: id });
        return res.status(200).json({ data: deletedTag });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
