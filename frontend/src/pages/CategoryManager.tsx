import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await api.post('/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Failed to add category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure? This might affect blogs in this category.')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert('Failed to delete category');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontSize: '2rem' }}>Manage Categories</h1>
        <Link to="/admin" className="btn btn-outline">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleAddCategory} style={{ padding: '1.5rem' }} className="flex gap-2">
          <input
            type="text"
            className="form-input"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} />
            Add
          </button>
        </form>
      </div>

      <div className="card">
        <div style={{ padding: '1.5rem' }}>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : categories.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.map((cat: any) => (
                <div key={cat.id} className="flex items-center justify-between" style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 500 }}>{cat.name}</span>
                  <button onClick={() => handleDeleteCategory(cat.id)} style={{ color: 'red' }}>
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
