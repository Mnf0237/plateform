import React from 'react';
import { Users, CheckCircle, Youtube, Instagram, Twitch, Globe } from 'lucide-react';
import { Creator } from '../types';

interface CreatorSpotlightProps {
  creators: Creator[];
}

const CreatorSpotlight: React.FC<CreatorSpotlightProps> = ({ creators }) => {
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getSocialIcon = (platform: string) => {
    const icons = {
      youtube: Youtube,
      instagram: Instagram,
      twitch: Twitch,
      website: Globe
    };
    return icons[platform as keyof typeof icons] || Globe;
  };

  const getCategoryEmoji = (category: string) => {
    const emojis = {
      artist: '🎨',
      gamer: '🎮',
      youtuber: '🎬',
      musician: '🎵',
      writer: '✍️',
      developer: '💻'
    };
    return emojis[category as keyof typeof emojis] || '⭐';
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Créateurs en vedette</h2>
        <button className="btn-secondary text-sm">
          Voir tous les créateurs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="glass-card group hover:scale-105 transition-all duration-300"
          >
            {/* Creator Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary-400/50"
                />
                <div className="absolute -bottom-1 -right-1 text-2xl">
                  {getCategoryEmoji(creator.category)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{creator.name}</h3>
                  {creator.verified && (
                    <CheckCircle className="w-5 h-5 text-primary-400" />
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>{formatFollowers(creator.followers)} followers</span>
                </div>
                <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 capitalize">
                  {creator.category}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {creator.bio}
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {Object.entries(creator.socialLinks).slice(0, 4).map(([platform, url]) => {
                  const IconComponent = getSocialIcon(platform);
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 glass rounded-lg hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
              
              <button className="btn-secondary text-sm py-2 px-4">
                Suivre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorSpotlight;