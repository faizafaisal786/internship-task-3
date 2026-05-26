import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params: any = { page, limit: 6 };
        if (selectedCategory) params.category = selectedCategory;
        if (search) params.search = search;
        
        const res = await api.get('/blogs', { params });
        setBlogs(res.data.blogs);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page, selectedCategory, search]);

  return (
    <div>
      <div className="flex flex-col md-flex-row items-center justify-between gap-4 mb-8">
        <h1 style={{ fontSize: '2rem' }}>Latest Blogs</h1>
        
        <div className="flex items-center gap-4" style={{ width: '100%', maxWidth: '600px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search blogs..."
              style={{ paddingLeft: '2.5rem' }}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          
          <select
            className="form-input"
            style={{ width: 'auto' }}
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
          >
            <option value="">All Categories</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading blogs...</div>
      ) : blogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md-grid-cols-2 md-grid-cols-3">
            {blogs.map((blog: any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`btn ${p === page ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">No blogs found.</div>
      )}
    </div>
  );
};

export default Home;
