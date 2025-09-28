import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Link as LinkIcon, Github, Play, Globe, Image as ImageIcon, FileText, Palette, Music, Camera, Code, Pen, Video, Type, Layers, Volume2 } from 'lucide-react';
import { ProjectCategory } from '../types';

const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'art' as ProjectCategory,
    tags: [] as string[],
    externalLinks: {
      demo: '',
      github: '',
      video: '',
      website: ''
    },
    // Champs spécialisés
    artData: {
      images: [] as string[],
      technique: '',
      software: '',
      dimensions: '',
      style: ''
    },
    videoData: {
      videoUrl: '',
      duration: '',
      resolution: '',
      format: '',
      thumbnail: ''
    },
    musicData: {
      audioUrl: '',
      genre: '',
      duration: '',
      bpm: '',
      key: '',
      instruments: [] as string[]
    },
    writingData: {
      content: '',
      wordCount: 0,
      language: 'fr',
      genre: '',
      format: 'article'
    },
    techData: {
      technologies: [] as string[],
      repository: '',
      liveDemo: '',
      documentation: ''
    },
    photographyData: {
      images: [] as string[],
      camera: '',
      lens: '',
      settings: '',
      location: ''
    },
    animationData: {
      videoUrl: '',
      software: '',
      technique: '',
      duration: '',
      frameRate: ''
    }
  });
  const [currentTag, setCurrentTag] = useState('');
  const [currentTech, setCurrentTech] = useState('');
  const [currentInstrument, setCurrentInstrument] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'art', label: 'Art & Design', icon: '🎨' },
    { value: 'gaming', label: 'Gaming', icon: '🎮' },
    { value: 'video', label: 'Vidéo', icon: '🎬' },
    { value: 'music', label: 'Musique', icon: '🎵' },
    { value: 'writing', label: 'Écriture', icon: '✍️' },
    { value: 'tech', label: 'Tech', icon: '💻' },
    { value: 'photography', label: 'Photo', icon: '📸' },
    { value: 'animation', label: 'Animation', icon: '🎞️' }
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        
        // Ajouter aux images spécialisées selon la catégorie
        if (formData.category === 'art') {
          setFormData(prev => ({
            ...prev,
            artData: {
              ...prev.artData,
              images: [...prev.artData.images, result]
            }
          }));
        } else if (formData.category === 'photography') {
          setFormData(prev => ({
            ...prev,
            photographyData: {
              ...prev.photographyData,
              images: [...prev.photographyData.images, result]
            }
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addTechnology = () => {
    if (currentTech.trim() && !formData.techData.technologies.includes(currentTech.trim())) {
      setFormData({
        ...formData,
        techData: {
          ...formData.techData,
          technologies: [...formData.techData.technologies, currentTech.trim()]
        }
      });
      setCurrentTech('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData({
      ...formData,
      techData: {
        ...formData.techData,
        technologies: formData.techData.technologies.filter(tech => tech !== techToRemove)
      }
    });
  };

  const addInstrument = () => {
    if (currentInstrument.trim() && !formData.musicData.instruments.includes(currentInstrument.trim())) {
      setFormData({
        ...formData,
        musicData: {
          ...formData.musicData,
          instruments: [...formData.musicData.instruments, currentInstrument.trim()]
        }
      });
      setCurrentInstrument('');
    }
  };

  const removeInstrument = (instrumentToRemove: string) => {
    setFormData({
      ...formData,
      musicData: {
        ...formData.musicData,
        instruments: formData.musicData.instruments.filter(inst => inst !== instrumentToRemove)
      }
    });
  };

  const removeImage = (imageToRemove: string, category: 'art' | 'photography') => {
    if (category === 'art') {
      setFormData(prev => ({
        ...prev,
        artData: {
          ...prev.artData,
          images: prev.artData.images.filter(img => img !== imageToRemove)
        }
      }));
    } else if (category === 'photography') {
      setFormData(prev => ({
        ...prev,
        photographyData: {
          ...prev.photographyData,
          images: prev.photographyData.images.filter(img => img !== imageToRemove)
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation de l'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirection vers le profil
    navigate('/profile');
  };

  const renderCategorySpecificFields = () => {
    switch (formData.category) {
      case 'art':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Palette className="w-6 h-6" />
              <span>Détails artistiques</span>
            </h2>
            
            <div className="space-y-6">
              {/* Images multiples */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Images du projet
                </label>
                
                {/* Images existantes */}
                {formData.artData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {formData.artData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Art ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image, 'art')}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Zone d'upload */}
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-primary-400 bg-primary-400/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-white font-medium mb-2">Ajouter des images</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(handleFile);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Technique */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technique utilisée
                  </label>
                  <select
                    value={formData.artData.technique}
                    onChange={(e) => setFormData({
                      ...formData,
                      artData: { ...formData.artData, technique: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner une technique</option>
                    <option value="digital">Art numérique</option>
                    <option value="traditional">Art traditionnel</option>
                    <option value="mixed">Technique mixte</option>
                    <option value="3d">Modélisation 3D</option>
                    <option value="vector">Art vectoriel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logiciel utilisé
                  </label>
                  <input
                    type="text"
                    value={formData.artData.software}
                    onChange={(e) => setFormData({
                      ...formData,
                      artData: { ...formData.artData, software: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Photoshop, Illustrator, Blender..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.artData.dimensions}
                    onChange={(e) => setFormData({
                      ...formData,
                      artData: { ...formData.artData, dimensions: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="1920x1080, A4, 30x40cm..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Style artistique
                  </label>
                  <input
                    type="text"
                    value={formData.artData.style}
                    onChange={(e) => setFormData({
                      ...formData,
                      artData: { ...formData.artData, style: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Réaliste, Cartoon, Abstrait..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Video className="w-6 h-6" />
              <span>Détails vidéo</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL de la vidéo *
                </label>
                <input
                  type="url"
                  required
                  value={formData.videoData.videoUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoData: { ...formData.videoData, videoUrl: e.target.value }
                  })}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="https://youtube.com/watch?v=... ou lien direct"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.videoData.duration}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoData: { ...formData.videoData, duration: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="2:30, 15 min..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Résolution
                  </label>
                  <select
                    value={formData.videoData.resolution}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoData: { ...formData.videoData, resolution: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="720p">720p HD</option>
                    <option value="1080p">1080p Full HD</option>
                    <option value="1440p">1440p 2K</option>
                    <option value="2160p">2160p 4K</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format
                  </label>
                  <select
                    value={formData.videoData.format}
                    onChange={(e) => setFormData({
                      ...formData,
                      videoData: { ...formData.videoData, format: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="short">Short vidéo (&lt; 1 min)</option>
                    <option value="standard">Vidéo standard</option>
                    <option value="long">Vidéo longue (&gt; 10 min)</option>
                    <option value="live">Live/Stream</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Miniature personnalisée
                </label>
                <input
                  type="url"
                  value={formData.videoData.thumbnail}
                  onChange={(e) => setFormData({
                    ...formData,
                    videoData: { ...formData.videoData, thumbnail: e.target.value }
                  })}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="URL de l'image miniature"
                />
              </div>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Volume2 className="w-6 h-6" />
              <span>Détails musicaux</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL audio *
                </label>
                <input
                  type="url"
                  required
                  value={formData.musicData.audioUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    musicData: { ...formData.musicData, audioUrl: e.target.value }
                  })}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="SoundCloud, Spotify, ou lien direct"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre musical
                  </label>
                  <select
                    value={formData.musicData.genre}
                    onChange={(e) => setFormData({
                      ...formData,
                      musicData: { ...formData.musicData, genre: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner un genre</option>
                    <option value="electronic">Électronique</option>
                    <option value="ambient">Ambient</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classique</option>
                    <option value="hip-hop">Hip-Hop</option>
                    <option value="indie">Indie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.musicData.duration}
                    onChange={(e) => setFormData({
                      ...formData,
                      musicData: { ...formData.musicData, duration: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="3:45, 2 min 30..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    BPM
                  </label>
                  <input
                    type="number"
                    value={formData.musicData.bpm}
                    onChange={(e) => setFormData({
                      ...formData,
                      musicData: { ...formData.musicData, bpm: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tonalité
                  </label>
                  <input
                    type="text"
                    value={formData.musicData.key}
                    onChange={(e) => setFormData({
                      ...formData,
                      musicData: { ...formData.musicData, key: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="C major, A minor..."
                  />
                </div>
              </div>

              {/* Instruments */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instruments utilisés
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.musicData.instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      <span>{instrument}</span>
                      <button
                        type="button"
                        onClick={() => removeInstrument(instrument)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentInstrument}
                    onChange={(e) => setCurrentInstrument(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstrument())}
                    className="flex-1 px-4 py-2 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Piano, Guitare, Synthé..."
                  />
                  <button
                    type="button"
                    onClick={addInstrument}
                    className="btn-secondary flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'writing':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Pen className="w-6 h-6" />
              <span>Détails d'écriture</span>
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format
                  </label>
                  <select
                    value={formData.writingData.format}
                    onChange={(e) => setFormData({
                      ...formData,
                      writingData: { ...formData.writingData, format: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="article">Article</option>
                    <option value="story">Nouvelle</option>
                    <option value="poem">Poème</option>
                    <option value="script">Script</option>
                    <option value="blog">Blog post</option>
                    <option value="essay">Essai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={formData.writingData.genre}
                    onChange={(e) => setFormData({
                      ...formData,
                      writingData: { ...formData.writingData, genre: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Fiction, Fantastique, Biographie..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Langue
                  </label>
                  <select
                    value={formData.writingData.language}
                    onChange={(e) => setFormData({
                      ...formData,
                      writingData: { ...formData.writingData, language: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="es">Espagnol</option>
                    <option value="de">Allemand</option>
                    <option value="it">Italien</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contenu *
                </label>
                <textarea
                  required
                  rows={12}
                  value={formData.writingData.content}
                  onChange={(e) => {
                    const content = e.target.value;
                    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
                    setFormData({
                      ...formData,
                      writingData: { 
                        ...formData.writingData, 
                        content,
                        wordCount
                      }
                    });
                  }}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400 resize-none font-mono"
                  placeholder="Écrivez votre contenu ici..."
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                  <span>{formData.writingData.wordCount} mots</span>
                  <span>{formData.writingData.content.length} caractères</span>
                </div>
              </div>

              {/* Options de mise en forme */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-3 py-1 glass rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <strong>Gras</strong>
                </button>
                <button
                  type="button"
                  className="px-3 py-1 glass rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <em>Italique</em>
                </button>
                <button
                  type="button"
                  className="px-3 py-1 glass rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  Citation
                </button>
                <button
                  type="button"
                  className="px-3 py-1 glass rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  Liste
                </button>
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Code className="w-6 h-6" />
              <span>Détails techniques</span>
            </h2>
            
            <div className="space-y-6">
              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies utilisées
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.techData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-4 py-2 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="React, Node.js, Python..."
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="btn-secondary flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Repository GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.techData.repository}
                    onChange={(e) => setFormData({
                      ...formData,
                      techData: { ...formData.techData, repository: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Démo en ligne
                  </label>
                  <input
                    type="url"
                    value={formData.techData.liveDemo}
                    onChange={(e) => setFormData({
                      ...formData,
                      techData: { ...formData.techData, liveDemo: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="https://mon-projet.vercel.app"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Documentation
                </label>
                <input
                  type="url"
                  value={formData.techData.documentation}
                  onChange={(e) => setFormData({
                    ...formData,
                    techData: { ...formData.techData, documentation: e.target.value }
                  })}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="Lien vers la documentation"
                />
              </div>
            </div>
          </div>
        );

      case 'photography':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Camera className="w-6 h-6" />
              <span>Détails photographiques</span>
            </h2>
            
            <div className="space-y-6">
              {/* Images multiples */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Photos
                </label>
                
                {formData.photographyData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {formData.photographyData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image, 'photography')}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-primary-400 bg-primary-400/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-white font-medium mb-2">Ajouter des photos</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(handleFile);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Appareil photo
                  </label>
                  <input
                    type="text"
                    value={formData.photographyData.camera}
                    onChange={(e) => setFormData({
                      ...formData,
                      photographyData: { ...formData.photographyData, camera: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Canon EOS R5, iPhone 14 Pro..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Objectif
                  </label>
                  <input
                    type="text"
                    value={formData.photographyData.lens}
                    onChange={(e) => setFormData({
                      ...formData,
                      photographyData: { ...formData.photographyData, lens: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="50mm f/1.8, 24-70mm f/2.8..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paramètres
                  </label>
                  <input
                    type="text"
                    value={formData.photographyData.settings}
                    onChange={(e) => setFormData({
                      ...formData,
                      photographyData: { ...formData.photographyData, settings: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="f/2.8, 1/125s, ISO 400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={formData.photographyData.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      photographyData: { ...formData.photographyData, location: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Paris, Studio, Nature..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'animation':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Layers className="w-6 h-6" />
              <span>Détails d'animation</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  URL de l'animation *
                </label>
                <input
                  type="url"
                  required
                  value={formData.animationData.videoUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    animationData: { ...formData.animationData, videoUrl: e.target.value }
                  })}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="Lien vers votre animation"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logiciel utilisé
                  </label>
                  <select
                    value={formData.animationData.software}
                    onChange={(e) => setFormData({
                      ...formData,
                      animationData: { ...formData.animationData, software: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="after-effects">After Effects</option>
                    <option value="blender">Blender</option>
                    <option value="cinema4d">Cinema 4D</option>
                    <option value="maya">Maya</option>
                    <option value="animate">Adobe Animate</option>
                    <option value="lottie">Lottie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technique
                  </label>
                  <select
                    value={formData.animationData.technique}
                    onChange={(e) => setFormData({
                      ...formData,
                      animationData: { ...formData.animationData, technique: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="2d">Animation 2D</option>
                    <option value="3d">Animation 3D</option>
                    <option value="motion-graphics">Motion Graphics</option>
                    <option value="stop-motion">Stop Motion</option>
                    <option value="mixed">Technique mixte</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={formData.animationData.duration}
                    onChange={(e) => setFormData({
                      ...formData,
                      animationData: { ...formData.animationData, duration: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="10s, 1:30..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Frame Rate
                  </label>
                  <select
                    value={formData.animationData.frameRate}
                    onChange={(e) => setFormData({
                      ...formData,
                      animationData: { ...formData.animationData, frameRate: e.target.value }
                    })}
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white"
                  >
                    <option value="">Sélectionner</option>
                    <option value="24">24 fps</option>
                    <option value="30">30 fps</option>
                    <option value="60">60 fps</option>
                    <option value="120">120 fps</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'gaming':
        return (
          <div className="glass-card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <span className="text-2xl">🎮</span>
              <span>Détails gaming</span>
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Jeu
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Valorant, Apex Legends, Minecraft..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type de contenu
                  </label>
                  <select className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white">
                    <option value="">Sélectionner</option>
                    <option value="gameplay">Gameplay</option>
                    <option value="montage">Montage</option>
                    <option value="tutorial">Tutoriel</option>
                    <option value="review">Test/Review</option>
                    <option value="stream">Stream/Live</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Plateforme
                  </label>
                  <select className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white">
                    <option value="">Sélectionner</option>
                    <option value="pc">PC</option>
                    <option value="ps5">PlayStation 5</option>
                    <option value="xbox">Xbox Series X/S</option>
                    <option value="switch">Nintendo Switch</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Niveau/Rang
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="Diamond, Global Elite..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Score/Stats
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                    placeholder="K/D, Victoire, Record..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Publier un nouveau projet</h1>
        <p className="text-gray-400">Partagez votre création avec la communauté</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <div className="glass-card">
          <h2 className="text-xl font-bold text-white mb-4">Image principale du projet</h2>
          
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
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
                  className="max-h-64 mx-auto rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">
                  Glissez-déposez votre image ici
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  ou cliquez pour sélectionner un fichier
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="btn-secondary"
                >
                  Choisir un fichier
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="glass-card">
          <h2 className="text-xl font-bold text-white mb-6">Détails du projet</h2>
          
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre du projet *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                placeholder="Donnez un titre accrocheur à votre projet"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400 resize-none"
                placeholder="Décrivez votre projet, votre processus créatif, les outils utilisés..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Catégorie *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value as ProjectCategory })}
                    className={`flex items-center space-x-2 p-3 rounded-lg font-medium transition-all duration-300 ${
                      formData.category === category.value
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : 'glass hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="text-sm">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                  placeholder="Ajouter un tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category-specific fields */}
        {renderCategorySpecificFields()}

        {/* External Links */}
        <div className="glass-card">
          <h2 className="text-xl font-bold text-white mb-6">Liens externes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Démo / Site web</span>
                </div>
              </label>
              <input
                type="url"
                value={formData.externalLinks.demo}
                onChange={(e) => setFormData({
                  ...formData,
                  externalLinks: { ...formData.externalLinks, demo: e.target.value }
                })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                placeholder="https://mon-projet.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </div>
              </label>
              <input
                type="url"
                value={formData.externalLinks.github}
                onChange={(e) => setFormData({
                  ...formData,
                  externalLinks: { ...formData.externalLinks, github: e.target.value }
                })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Vidéo</span>
                </div>
              </label>
              <input
                type="url"
                value={formData.externalLinks.video}
                onChange={(e) => setFormData({
                  ...formData,
                  externalLinks: { ...formData.externalLinks, video: e.target.value }
                })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-4 h-4" />
                  <span>Site web</span>
                </div>
              </label>
              <input
                type="url"
                value={formData.externalLinks.website}
                onChange={(e) => setFormData({
                  ...formData,
                  externalLinks: { ...formData.externalLinks, website: e.target.value }
                })}
                className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/20 text-white placeholder-gray-400"
                placeholder="https://mon-site.com"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.title || !formData.description}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publication...' : 'Publier le projet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;