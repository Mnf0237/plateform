import React, { useState } from 'react';
import { Search, TrendingUp, Clock, Heart, Eye } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import ProjectCard from '../components/ProjectCard';
import { mockProjects, mockCreators } from '../data/mockData';
import { ProjectCategory, SortOption } from '../types';

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
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

  const trendingTags = ['cyberpunk', 'gaming', 'digital art', 'ambient', 'fps', 'character design'];
  const featuredCreators = mockCreators.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Explorer</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez les dernières créations de notre communauté talentueuse
        </p>
      </div>

      {/* Search */}
      <div className="glass-card">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher des projets, créateurs, tags..."
            className="w-full pl-12 pr-4 py-4 glass rounded-xl border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400 text-lg"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card text-center">
          <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-sm text-gray-400">Projets tendance</div>
        </div>
        <div className="glass-card text-center">
          <Clock className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-sm text-gray-400">Nouveaux aujourd'hui</div>
        </div>
        <div className="glass-card text-center">
          <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">89.2k</div>
          <div className="text-sm text-gray-400">Likes cette semaine</div>
        </div>
        <div className="glass-card text-center">
          <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">2.1M</div>
          <div className="text-sm text-gray-400">Vues ce mois</div>
        </div>
      </div>

      {/* Trending Tags */}
      <div className="glass-card">
        <h2 className="text-xl font-bold text-white mb-4">Tags tendance</h2>
        <div className="flex flex-wrap gap-3">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 hover:from-primary-500/30 hover:to-secondary-500/30 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Creators */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Créateurs à suivre</h2>
          <button className="btn-secondary text-sm">Voir tous</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCreators.map((creator) => (
            <div key={creator.id} className="text-center group">
              <div className="relative mb-3">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-primary-400/50 group-hover:ring-primary-400 transition-all duration-300"
                />
                {creator.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">
                {creator.name}
              </h3>
              <p className="text-xs text-gray-400 capitalize">{creator.category}</p>
              <button className="mt-2 px-3 py-1 bg-white/10 hover:bg-primary-500/20 rounded-full text-xs text-white transition-colors">
                Suivre
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {searchQuery ? `Résultats pour "${searchQuery}"` : 'Tous les projets'}
            <span className="text-gray-400 font-normal ml-2">({sortedProjects.length})</span>
          </h2>
        </div>

        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun résultat</h3>
            <p className="text-gray-400 mb-6">
              Aucun projet ne correspond à vos critères de recherche.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => setSearchQuery('')}
                className="btn-primary"
              >
                Effacer la recherche
              </button>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="btn-secondary"
              >
                Voir tous les projets
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedProjects.length > 0 && (
        <div className="text-center">
          <button className="btn-secondary">
            Charger plus de projets
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;