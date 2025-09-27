import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import ProjectCard from './components/ProjectCard';
import CreatorSpotlight from './components/CreatorSpotlight';
import { mockProjects, mockCreators } from './data/mockData';
import { ProjectCategory, SortOption } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'trending':
          return (b.views + b.likes * 2) - (a.views + a.likes * 2);
        case 'most-liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Hero />
        
        <CreatorSpotlight creators={mockCreators} />
        
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More */}
        {filteredAndSortedProjects.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Charger plus de projets
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-gray-400 mb-6">
              Essayez de changer les filtres ou explorez d'autres catégories.
            </p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="btn-primary"
            >
              Voir tous les projets
            </button>
          </div>
        )}
      </main>

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
  );
}

export default App;