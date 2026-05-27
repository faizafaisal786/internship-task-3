import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  generateSummary,
} from '../controllers/blog.controller';
import { authenticate, isAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes
router.get('/admin/all', authenticate, isAdmin, getAllBlogsAdmin);
router.post('/generate-summary', authenticate, isAdmin, generateSummary);
router.post('/', authenticate, isAdmin, createBlog);
router.put('/:id', authenticate, isAdmin, updateBlog);
router.delete('/:id', authenticate, isAdmin, deleteBlog);

export default router;
