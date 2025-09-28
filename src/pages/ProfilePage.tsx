import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, MapPin, Calendar, Link as LinkIcon, CreditCard as Edit3, Camera } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'liked' | 'collections'>('projects');
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-white mb-4">Accès refusé</h2>
        <p className="text-gray-400">Vous devez être connecté pour voir cette page.</p>
      </div>
    );
  }

  // Simuler les projets de l'utilisateur
  const userProjects = mockProjects.slice(0, 3);
  const likedProjects = mockProjects.slice(3, 5);

  const tabs = [
    { id: 'projects', label: 'Mes projets', count: userProjects.length },
    { id: 'liked', label: 'Aimés', count: likedProjects.length },
    { id: 'collections', label: 'Collections', count: 2 }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card mb-8">
        <div className="relative">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-t-xl relative">
            <button className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white/20 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 mt-4 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.verified && (
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </h1>
                    <p className="text-gray-400 mt-1">{user.bio}</p>
                  </div>

                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Modifier</span>
                    </button>
                    <button className="btn-secondary">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.followers}</div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{user.following}</div>
                    <div className="text-sm text-gray-400">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{userProjects.length}</div>
                    <div className="text-sm text-gray-400">Projets</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap items-center space-x-4 mt-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>Paris, France</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis janvier 2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href="#" className="text-primary-400 hover:text-primary-300">
                      portfolio.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card mb-8">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Mes projets</h2>
              <button className="btn-primary">
                Nouveau projet
              </button>
            </div>
            
            {userProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun projet</h3>
                <p className="text-gray-400 mb-6">
                  Commencez par publier votre premier projet !
                </p>
                <button className="btn-primary">
                  Créer un projet
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'liked' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Projets aimés</h2>
            
            {likedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun projet aimé</h3>
                <p className="text-gray-400">
                  Les projets que vous aimez apparaîtront ici.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'collections' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Collections</h2>
              <button className="btn-primary">
                Nouvelle collection
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card">
                <div className="h-32 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-2">Inspiration Design</h3>
                <p className="text-gray-400 text-sm mb-4">12 projets • Créée il y a 2 jours</p>
                <div className="flex -space-x-2">
                  {mockProjects.slice(0, 3).map((project, index) => (
                    <img
                      key={project.id}
                      src={project.image}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white/20 object-cover"
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                </div>
              </div>

              <div className="glass-card">
                <div className="h-32 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-lg mb-4"></div>
                <h3 className="text-lg font-bold text-white mb-2">Gaming Highlights</h3>
                <p className="text-gray-400 text-sm mb-4">8 projets • Créée il y a 1 semaine</p>
                <div className="flex -space-x-2">
                  {mockProjects.slice(1, 4).map((project, index) => (
                    <img
                      key={project.id}
                      src={project.image}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white/20 object-cover"
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;