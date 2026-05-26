import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container flex items-center justify-between" style={{ height: '100%' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
          BlogHub
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/" className="btn-link">Home</Link>
          {user ? (
            <>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="btn btn-outline">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-2" style={{ marginLeft: '1rem' }}>
                <User size={18} />
                <span>{user.name}</span>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem' }}>
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
