import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const getBlogs = async (req: Request, res: Response) => {
  const { category, page = 1, limit = 6, search } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const where: any = { published: true };
    if (category) {
      where.category = { slug: category as string };
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { summary: { contains: search as string } },
      ];
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { category: true, author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit),
      }),
      prisma.blog.count({ where }),
    ]);

    res.json({
      blogs,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: { category: true, author: { select: { name: true } } },
    });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin Controllers
export const getAllBlogsAdmin = async (req: AuthRequest, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { category: true, author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content, summary, coverImage, categoryId, published } = req.body;
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        summary,
        coverImage,
        published,
        authorId: req.user!.userId,
        categoryId,
      },
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlog = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  const { title, content, summary, coverImage, categoryId, published } = req.body;

  try {
    const blog = await prisma.blog.update({
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
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBlog = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  try {
    await prisma.blog.delete({ where: { id } });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
