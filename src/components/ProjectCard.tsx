import React from 'react';
import { Heart, Eye, MessageCircle, ExternalLink, Play, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      art: '🎨',
      gaming: '🎮',
      video: '🎬',
      music: '🎵',
      writing: '✍️',
      tech: '💻',
      photography: '📸',
      animation: '🎞️'
    };
    return icons[category as keyof typeof icons] || '🎯';
  };

  return (
    <div className="glass-card group hover:scale-105 transition-all duration-300 animate-fade-in">
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium">
            <span>{getCategoryIcon(project.category)}</span>
            <span className="capitalize">{project.category}</span>
          </span>
        </div>

        {/* External Links Overlay */}
        {project.externalLinks && (
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.externalLinks.demo && (
              <a
                href={project.externalLinks.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-primary-500/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.externalLinks.video && (
              <a
                href={project.externalLinks.video}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-red-500/80 transition-colors"
              >
                <Play className="w-4 h-4" />
              </a>
            )}
            {project.externalLinks.github && (
              <a
                href={project.externalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-gray-500/80 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-300 text-sm line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
          <img
            src={project.creatorAvatar}
            alt={project.creatorName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-300 font-medium">
            {project.creatorName}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{formatNumber(project.likes)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(project.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{formatNumber(project.comments)}</span>
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;