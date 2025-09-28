import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Bell, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <h1 className="text-xl font-bold gradient-text">CreatorPlatform</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des projets, créateurs..."
                onClick={() => navigate('/explore')}
                className="w-full pl-10 pr-4 py-2 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-white hover:bg-white/20 transition-colors first:rounded-t-lg"
                    >
                      Mon profil
                    </Link>
                    <Link
                      to="/create"
                      className="block px-4 py-3 text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      Publier un projet
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/20 transition-colors last:rounded-b-lg"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
                <Link to="/create" className="btn-primary">
                  Publier un projet
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary">
                  S'inscrire
                </Link>
              </>
            )}
            <button className="md:hidden p-2 glass rounded-lg hover:bg-white/20 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;