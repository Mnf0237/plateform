import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import CreatorSpotlight from '../components/CreatorSpotlight';
import { mockProjects, mockCreators } from '../data/mockData';
import { ProjectCategory, SortOption } from '../types';

const HomePage: React.FC = () => {
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
    <div>
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
    </div>
  );
};

export default HomePage;