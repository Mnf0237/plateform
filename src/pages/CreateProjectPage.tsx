import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Link as LinkIcon, Github, Play, Globe } from 'lucide-react';
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
    }
  });
  const [currentTag, setCurrentTag] = useState('');
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
        setUploadedImage(e.target?.result as string);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation de l'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Redirection vers le profil
    navigate('/profile');
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
          <h2 className="text-xl font-bold text-white mb-4">Image du projet</h2>
          
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