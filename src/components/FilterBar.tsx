import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { ProjectCategory, SortOption } from '../types';

interface FilterBarProps {
  selectedCategory: ProjectCategory | 'all';
  onCategoryChange: (category: ProjectCategory | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const categories = [
  { value: 'all' as const, label: 'Tous les projets', icon: '🎯' },
  { value: 'art' as const, label: 'Art & Design', icon: '🎨' },
  { value: 'gaming' as const, label: 'Gaming', icon: '🎮' },
  { value: 'video' as const, label: 'Vidéo', icon: '🎬' },
  { value: 'music' as const, label: 'Musique', icon: '🎵' },
  { value: 'writing' as const, label: 'Écriture', icon: '✍️' },
  { value: 'tech' as const, label: 'Tech', icon: '💻' },
  { value: 'photography' as const, label: 'Photo', icon: '📸' },
  { value: 'animation' as const, label: 'Animation', icon: '🎞️' }
];

const sortOptions = [
  { value: 'recent' as const, label: 'Plus récents' },
  { value: 'popular' as const, label: 'Populaires' },
  { value: 'trending' as const, label: 'Tendances' },
  { value: 'most-liked' as const, label: 'Plus aimés' }
];

const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <div className="glass-card mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'glass hover:bg-white/20 text-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/20 transition-colors"
          >
            <span>Trier par: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg border border-white/20 shadow-xl z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/20 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option.value ? 'bg-white/10 text-primary-400' : 'text-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;