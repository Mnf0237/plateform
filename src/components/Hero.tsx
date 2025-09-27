import React from 'react';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-16 mb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl" />
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-400/30 rounded-full blur-xl animate-bounce-gentle" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary-400/30 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
      
      <div className="relative glass-card text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary-400/30">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Plateforme de découverte créative</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Découvrez les{' '}
          <span className="gradient-text">créateurs</span>
          <br />
          de demain
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Une plateforme où les artistes, gamers, musiciens et créateurs de contenu 
          peuvent exposer leurs projets et se connecter avec leur audience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <button className="btn-primary text-lg px-8 py-4">
            Explorer les projets
          </button>
          <button className="btn-secondary text-lg px-8 py-4">
            Devenir créateur
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-primary-400 mr-2" />
              <span className="text-2xl font-bold text-white">10k+</span>
            </div>
            <p className="text-gray-400">Créateurs actifs</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6 text-secondary-400 mr-2" />
              <span className="text-2xl font-bold text-white">50k+</span>
            </div>
            <p className="text-gray-400">Projets publiés</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-primary-400 mr-2" />
              <span className="text-2xl font-bold text-white">1M+</span>
            </div>
            <p className="text-gray-400">Vues mensuelles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;