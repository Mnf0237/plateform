import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Settings, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Edit3, 
  Camera, 
  Plus,
  Share2,
  MoreHorizontal,
  Award,
  Star,
  Users,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Download,
  ExternalLink,
  Upload,
  X,
  Cloud,
  Image as ImageIcon
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { mockProjects } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'liked' | 'collections' | 'about'>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [uploadedCover, setUploadedCover] = useState<string | null>(null);

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
  
  // Statistiques utilisateur
  const userStats = {
    totalViews: 125400,
    totalLikes: 8920,
    totalComments: 1240,
    projectsCount: userProjects.length,
    rank: 'Créateur Vérifié',
    joinDate: 'Janvier 2024',
    location: 'Paris, France',
    website: 'https://portfolio.com'
  };

  const tabs = [
    { id: 'projects', label: 'Mes projets', count: userProjects.length },
    { id: 'liked', label: 'Aimés', count: likedProjects.length },
    { id: 'collections', label: 'Collections', count: 2 },
    { id: 'about', label: 'À propos', count: null }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedCover(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileImage = () => {
    // Ici on sauvegarderait l'image sur le serveur
    console.log('Sauvegarde de l\'image de profil');
    setShowImageUpload(false);
    setUploadedImage(null);
  };

  const saveCoverImage = () => {
    // Ici on sauvegarderait l'image de couverture sur le serveur
    console.log('Sauvegarde de l\'image de couverture');
    setShowCoverUpload(false);
    setUploadedCover(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="glass-card mb-8">
        <div className="relative">
          {/* Cover Image */}
          <div 
            className="h-48 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-t-xl relative overflow-hidden cursor-pointer group"
            onClick={() => isEditing && setShowCoverUpload(true)}
            style={uploadedCover ? { backgroundImage: `url(${uploadedCover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {/* Decorative elements */}
            {!uploadedCover && (
              <>
                <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 right-8 w-24 h-24 bg-secondary-400/20 rounded-full blur-xl"></div>
              </>
            )}
            
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Changer la photo de couverture</p>
                </div>
              </div>
            )}
            
            {isEditing && !uploadedCover && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCoverUpload(true);
                }}
                className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-white/20 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
            
            {/* Share button */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass rounded-lg border border-white/20 shadow-xl z-10">
                    <button className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors first:rounded-t-lg">
                      Copier le lien
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors">
                      Partager sur Twitter
                    </button>
                    <button className="w-full text-left px-4 py-3 hover:bg-white/20 transition-colors last:rounded-b-lg">
                      Télécharger QR Code
                    </button>
                  </div>
                )}
              </div>
              
              <button className="p-2 glass rounded-lg hover:bg-white/20 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6 -mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={uploadedImage || user.avatar}
                  alt={user.name}
                  className="w-40 h-40 rounded-full border-4 border-white/20 object-cover shadow-2xl"
                />
                {isEditing && (
                  <button 
                    onClick={() => setShowImageUpload(true)}
                    className="absolute bottom-2 right-2 p-3 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors shadow-lg"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                )}
                
                {/* Status indicator */}
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 mt-4 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.verified && (
                        <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400 font-medium">{userStats.rank}</span>
                      </div>
                    </h1>
                    <p className="text-gray-300 mt-2 text-lg">{user.bio}</p>
                    
                    {/* Quick stats */}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{userStats.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Membre depuis {userStats.joinDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <LinkIcon className="w-4 h-4" />
                        <a href={userStats.website} className="text-primary-400 hover:text-primary-300">
                          portfolio.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    {!isEditing && (
                      <button className="btn-secondary flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Suivre</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{isEditing ? 'Sauvegarder' : 'Modifier'}</span>
                    </button>
                    <button className="btn-secondary">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-3 glass rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="w-5 h-5 text-primary-400 mr-1" />
                      <div className="text-xl font-bold text-white">{user.followers.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="text-center p-3 glass rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Eye className="w-5 h-5 text-green-400 mr-1" />
                      <div className="text-xl font-bold text-white">{userStats.totalViews.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-400">Vues totales</div>
                  </div>
                  <div className="text-center p-3 glass rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Heart className="w-5 h-5 text-red-400 mr-1" />
                      <div className="text-xl font-bold text-white">{userStats.totalLikes.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-400">Likes totaux</div>
                  </div>
                  <div className="text-center p-3 glass rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <div className="text-xl font-bold text-white">{userStats.projectsCount}</div>
                    </div>
                    <div className="text-sm text-gray-400">Projets</div>
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
              {tab.label} {tab.count !== null && `(${tab.count})`}
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
              <Link to="/create" className="btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouveau projet</span>
              </Link>
            </div>
            
            {userProjects.length > 0 ? (
              <div className="space-y-6">
                {/* Project stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card text-center">
                    <TrendingUp className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">12.5k</div>
                    <div className="text-sm text-gray-400">Vues ce mois</div>
                  </div>
                  <div className="glass-card text-center">
                    <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">892</div>
                    <div className="text-sm text-gray-400">Nouveaux likes</div>
                  </div>
                  <div className="glass-card text-center">
                    <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">124</div>
                    <div className="text-sm text-gray-400">Commentaires</div>
                  </div>
                </div>
                
                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 glass-card">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Aucun projet</h3>
                <p className="text-gray-400 mb-6">
                  Commencez par publier votre premier projet !
                </p>
                <Link to="/create" className="btn-primary">
                  Créer un projet
                </Link>
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

        {activeTab === 'about' && (
          <div className="space-y-8">
            {/* Bio détaillée */}
            <div className="glass-card">
              <h2 className="text-xl font-bold text-white mb-4">À propos de moi</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Passionné de création numérique depuis plus de 5 ans, je me spécialise dans l'art conceptuel 
                  et le design d'interface. Mon travail s'inspire de l'esthétique cyberpunk et des univers futuristes.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  J'aime explorer de nouvelles techniques et partager mes connaissances avec la communauté créative. 
                  Chaque projet est une opportunité d'apprendre et de repousser les limites de ma créativité.
                </p>
              </div>
            </div>

            {/* Compétences */}
            <div className="glass-card">
              <h2 className="text-xl font-bold text-white mb-4">Compétences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'Digital Art', level: 95 },
                  { name: 'UI/UX Design', level: 88 },
                  { name: 'Illustration', level: 92 },
                  { name: 'Animation', level: 75 },
                  { name: 'Photoshop', level: 98 },
                  { name: 'Figma', level: 85 }
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Réalisations */}
            <div className="glass-card">
              <h2 className="text-xl font-bold text-white mb-4">Réalisations</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Featured Artist',
                    description: 'Sélectionné comme artiste vedette du mois',
                    date: 'Décembre 2023',
                    icon: <Award className="w-6 h-6 text-yellow-400" />
                  },
                  {
                    title: 'Top Creator',
                    description: 'Classé dans le top 10 des créateurs les plus suivis',
                    date: 'Novembre 2023',
                    icon: <TrendingUp className="w-6 h-6 text-green-400" />
                  },
                  {
                    title: 'Community Choice',
                    description: 'Prix du choix de la communauté pour "Cyberpunk City"',
                    date: 'Octobre 2023',
                    icon: <Star className="w-6 h-6 text-purple-400" />
                  }
                ].map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{achievement.title}</h3>
                      <p className="text-gray-300 text-sm">{achievement.description}</p>
                      <p className="text-gray-400 text-xs mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liens sociaux */}
            <div className="glass-card">
              <h2 className="text-xl font-bold text-white mb-4">Retrouvez-moi sur</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Portfolio', url: 'https://portfolio.com', icon: '🌐' },
                  { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
                  { name: 'YouTube', url: 'https://youtube.com', icon: '🎥' },
                  { name: 'Behance', url: 'https://behance.net', icon: '🎨' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 glass rounded-lg hover:bg-white/20 transition-all duration-300 group"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <div>
                      <div className="text-white font-medium group-hover:text-primary-400 transition-colors">
                        {social.name}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Changer la photo de profil</h3>
              <button
                onClick={() => {
                  setShowImageUpload(false);
                  setUploadedImage(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-6 ${
                dragActive
                  ? 'border-primary-400 bg-primary-400/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white/20"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-0 right-1/2 translate-x-16 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    Glissez-déposez votre image ici
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    ou choisissez depuis votre appareil
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Upload Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="flex items-center justify-center space-x-2 p-4 glass rounded-lg hover:bg-white/20 transition-colors">
                <Upload className="w-5 h-5" />
                <span>Fichier local</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 glass rounded-lg hover:bg-white/20 transition-colors">
                <Cloud className="w-5 h-5" />
                <span>Cloud</span>
              </button>
            </div>

            {/* Suggestions */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">Ou choisissez parmi ces suggestions :</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
                  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
                  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
                  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
                ].map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setUploadedImage(src)}
                    className="aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-400 transition-all"
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowImageUpload(false);
                  setUploadedImage(null);
                }}
                className="flex-1 btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={saveProfileImage}
                disabled={!uploadedImage}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Upload Modal */}
      {showCoverUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Changer la photo de couverture</h3>
              <button
                onClick={() => {
                  setShowCoverUpload(false);
                  setUploadedCover(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 mb-6 border-white/20 hover:border-white/40">
              {uploadedCover ? (
                <div className="relative">
                  <img
                    src={uploadedCover}
                    alt="Preview"
                    className="w-full h-32 mx-auto rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setUploadedCover(null)}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    Glissez-déposez votre image de couverture
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Recommandé: 1200x300px
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleCoverFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Upload Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="flex items-center justify-center space-x-2 p-4 glass rounded-lg hover:bg-white/20 transition-colors">
                <Upload className="w-5 h-5" />
                <span>Fichier local</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleCoverFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </button>
              
              <button className="flex items-center justify-center space-x-2 p-4 glass rounded-lg hover:bg-white/20 transition-colors">
                <Cloud className="w-5 h-5" />
                <span>Cloud</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowCoverUpload(false);
                  setUploadedCover(null);
                }}
                className="flex-1 btn-secondary"
              >
                Annuler
              </button>
              <button
                onClick={saveCoverImage}
                disabled={!uploadedCover}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;