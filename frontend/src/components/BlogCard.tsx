import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User as UserIcon, Tag } from 'lucide-react';

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    coverImage?: string;
    createdAt: string;
    category: { name: string };
    author: { name: string };
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <article className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {blog.category.name}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>
          <Link to={`/blog/${blog.slug}`} style={{ color: 'inherit' }}>{blog.title}</Link>
        </h3>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', flex: 1 }}>
          {blog.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
            <UserIcon size={16} />
            {blog.author.name}
          </span>
          <Link to={`/blog/${blog.slug}`} className="btn-link" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
