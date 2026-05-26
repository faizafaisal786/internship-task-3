"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.createCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getCategories = async (req, res) => {
    try {
        const categories = await prisma_1.default.category.findMany();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');
    try {
        const category = await prisma_1.default.category.create({
            data: { name, slug },
        });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createCategory = createCategory;
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma_1.default.category.delete({ where: { id } });
        res.json({ message: 'Category deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.controller.js.map