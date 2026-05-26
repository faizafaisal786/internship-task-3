"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', blog_controller_1.getBlogs);
router.get('/:slug', blog_controller_1.getBlogBySlug);
router.get('/admin/all', auth_1.authenticate, auth_1.isAdmin, blog_controller_1.getAllBlogsAdmin);
router.post('/', auth_1.authenticate, auth_1.isAdmin, blog_controller_1.createBlog);
router.put('/:id', auth_1.authenticate, auth_1.isAdmin, blog_controller_1.updateBlog);
router.delete('/:id', auth_1.authenticate, auth_1.isAdmin, blog_controller_1.deleteBlog);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map