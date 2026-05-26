import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Edit, Trash, Eye, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs/admin/all');
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link to="/admin/categories" className="btn btn-outline">
            <Settings size={18} />
            Manage Categories
          </Link>
          <Link to="/admin/blogs/new" className="btn btn-primary">
            <Plus size={18} />
            Create New Blog
          </Link>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', backgroundColor: '#fcfcfc' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <tr key={blog.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{blog.title}</td>
                  <td style={{ padding: '1rem' }}>{blog.category.name}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '1rem', 
                      fontSize: '0.75rem',
                      backgroundColor: blog.published ? '#dcfce7' : '#fee2e2',
                      color: blog.published ? '#166534' : '#991b1b'
                    }}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div className="flex justify-end gap-2">
                      <Link to={`/blog/${blog.slug}`} className="btn btn-outline" style={{ padding: '0.4rem' }} title="View">
                        <Eye size={16} />
                      </Link>
                      <Link to={`/admin/blogs/edit/${blog.id}`} className="btn btn-outline" style={{ padding: '0.4rem' }} title="Edit">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => handleDelete(blog.id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'red' }} title="Delete">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-4">No blogs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
