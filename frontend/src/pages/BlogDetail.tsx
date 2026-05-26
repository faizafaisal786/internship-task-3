import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!blog) return <div className="text-center py-8">Blog not found.</div>;

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" className="btn btn-outline mb-4">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          alt={blog.title}
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: 'var(--radius)', marginBottom: '2rem' }}
        />
      )}

      <div className="flex items-center gap-4 mb-4" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1">
          <Tag size={16} />
          {blog.category.name}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center gap-1">
          <User size={16} />
          {blog.author.name}
        </span>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{blog.title}</h1>
      
      <div 
        className="blog-content" 
        dangerouslySetInnerHTML={{ __html: blog.content }} 
        style={{ fontSize: '1.125rem', lineHeight: 1.8 }}
      />
    </article>
  );
};

export default BlogDetail;
