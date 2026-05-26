"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getAllBlogsAdmin = exports.getBlogBySlug = exports.getBlogs = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getBlogs = async (req, res) => {
    const { category, page = 1, limit = 6, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    try {
        const where = { published: true };
        if (category) {
            where.category = { slug: category };
        }
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { summary: { contains: search } },
            ];
        }
        const [blogs, total] = await Promise.all([
            prisma_1.default.blog.findMany({
                where,
                include: { category: true, author: { select: { name: true } } },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit),
            }),
            prisma_1.default.blog.count({ where }),
        ]);
        res.json({
            blogs,
            pagination: {
                total,
                pages: Math.ceil(total / Number(limit)),
                currentPage: Number(page),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getBlogs = getBlogs;
const getBlogBySlug = async (req, res) => {
    const slug = req.params.slug;
    try {
        const blog = await prisma_1.default.blog.findUnique({
            where: { slug },
            include: { category: true, author: { select: { name: true } } },
        });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getBlogBySlug = getBlogBySlug;
const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await prisma_1.default.blog.findMany({
            include: { category: true, author: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllBlogsAdmin = getAllBlogsAdmin;
const createBlog = async (req, res) => {
    const { title, content, summary, coverImage, categoryId, published } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
    try {
        const blog = await prisma_1.default.blog.create({
            data: {
                title,
                slug,
                content,
                summary,
                coverImage,
                published,
                authorId: req.user.userId,
                categoryId,
            },
        });
        res.status(201).json(blog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    const id = req.params.id;
    const { title, content, summary, coverImage, categoryId, published } = req.body;
    try {
        const blog = await prisma_1.default.blog.update({
            where: { id },
            data: {
                title,
                content,
                summary,
                coverImage,
                categoryId,
                published,
            },
        });
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma_1.default.blog.delete({ where: { id } });
        res.json({ message: 'Blog deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.controller.js.map