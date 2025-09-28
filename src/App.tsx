import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreateProjectPage from './pages/CreateProjectPage';
import ExplorePage from './pages/ExplorePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreateProjectPage />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
          </main>
  );
}

          {/* Footer */}
          <footer className="glass border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">CP</span>
                    </div>
                    <h3 className="text-xl font-bold gradient-text">CreatorPlatform</h3>
                  </div>
                  <p className="text-gray-400 mb-4">
                    La plateforme de découverte créative qui connecte les créateurs avec leur audience.
                  </p>
                  <div className="flex space-x-4">
                    <button className="btn-secondary">
                      Devenir créateur
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-4">Catégories</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Art & Design</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Gaming</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Musique</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Vidéo</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Centre d'aide</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Conditions</a></li>
                    <li><a href="#" className="hover:text-primary-400 transition-colors">Confidentialité</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 CreatorPlatform. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
export default App;