import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';
import { Save, X, Image as ImageIcon } from 'lucide-react';

const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [published, setPublished] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
        if (res.data.length > 0 && !isEdit) setCategoryId(res.data[0].id);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };

    const fetchBlog = async () => {
      if (!isEdit) return;
      try {
        const res = await api.get(`/blogs/admin/all`); // Ideally we'd have a getById but we can find it in the list or use public one
        const blog = res.data.find((b: any) => b.id === id);
        if (blog) {
          setTitle(blog.title);
          setSummary(blog.summary);
          setContent(blog.content);
          setCoverImage(blog.coverImage || '');
          setCategoryId(blog.categoryId);
          setPublished(blog.published);
        }
      } catch (err) {
        console.error('Failed to fetch blog');
      }
    };

    fetchCategories();
    fetchBlog();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { title, summary, content, coverImage, categoryId, published };
      if (isEdit) {
        await api.put(`/blogs/${id}`, data);
      } else {
        await api.post('/blogs', data);
      }
      navigate('/admin');
    } catch (err) {
      alert('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="flex items-center justify-between mb-8">
        <h1>{isEdit ? 'Edit Blog' : 'Create New Blog'}</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate('/admin')} className="btn btn-outline">
            <X size={18} />
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md-grid-cols-3 gap-8">
        <div className="md-col-span-2 card" style={{ gridColumn: 'span 2' }}>
          <div style={{ padding: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Content</label>
              <div style={{ height: '400px', marginBottom: '3rem' }}>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  style={{ height: '350px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: 'fit-content' }}>
          <div style={{ padding: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Summary</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Brief summary of the blog"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <div style={{ position: 'relative' }}>
                <ImageIcon 
                  size={18} 
                  style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="https://example.com/image.jpg"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>
              {coverImage && (
                <img 
                  src={coverImage} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: 'var(--radius)' }} 
                />
              )}
            </div>

            <div className="form-group flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label htmlFor="published" style={{ fontWeight: 500, cursor: 'pointer' }}>Publish Immediately</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
