import { Creator, Project } from '../types';

export const mockCreators: Creator[] = [
  {
    id: '1',
    name: 'Luna Art',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Digital artist specializing in fantasy illustrations and character design',
    followers: 15420,
    verified: true,
    category: 'artist',
    socialLinks: {
      instagram: 'https://instagram.com/lunaart',
      youtube: 'https://youtube.com/lunaart',
      website: 'https://lunaart.com'
    },
    projects: []
  },
  {
    id: '2',
    name: 'GameMaster Pro',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Professional gamer and streamer. Apex Legends & Valorant content creator',
    followers: 28750,
    verified: true,
    category: 'gamer',
    socialLinks: {
      twitch: 'https://twitch.tv/gamemasterpro',
      youtube: 'https://youtube.com/gamemasterpro',
      discord: 'https://discord.gg/gamemasterpro'
    },
    projects: []
  },
  {
    id: '3',
    name: 'Melody Waves',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Indie musician creating dreamy electronic soundscapes',
    followers: 8930,
    verified: false,
    category: 'musician',
    socialLinks: {
      youtube: 'https://youtube.com/melodywaves',
      instagram: 'https://instagram.com/melodywaves'
    },
    projects: []
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Cyberpunk City Concept',
    description: 'A futuristic cityscape with neon lights and flying cars. This piece explores the aesthetic of cyberpunk culture.',
    image: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'art',
    creatorId: '1',
    creatorName: 'Luna Art',
    creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 1250,
    views: 8420,
    comments: 89,
    createdAt: '2024-01-15',
    tags: ['cyberpunk', 'digital art', 'concept art', 'futuristic'],
    externalLinks: {
      demo: 'https://artstation.com/artwork/cyberpunk-city'
    }
  },
  {
    id: '2',
    title: 'Apex Legends Ranked Climb',
    description: 'Watch me climb from Diamond to Master in Apex Legends! Epic gameplay and pro tips included.',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gaming',
    creatorId: '2',
    creatorName: 'GameMaster Pro',
    creatorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 2840,
    views: 15600,
    comments: 234,
    createdAt: '2024-01-14',
    tags: ['apex legends', 'gaming', 'ranked', 'fps'],
    externalLinks: {
      video: 'https://youtube.com/watch?v=apex-climb',
      stream: 'https://twitch.tv/gamemasterpro'
    }
  },
  {
    id: '3',
    title: 'Midnight Dreams EP',
    description: 'My latest electronic music EP featuring 5 ambient tracks perfect for late night listening.',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'music',
    creatorId: '3',
    creatorName: 'Melody Waves',
    creatorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 567,
    views: 3240,
    comments: 45,
    createdAt: '2024-01-13',
    tags: ['electronic', 'ambient', 'chill', 'instrumental'],
    externalLinks: {
      demo: 'https://soundcloud.com/melodywaves/midnight-dreams'
    }
  },
  {
    id: '4',
    title: 'Fantasy Character Design',
    description: 'Original character design for a fantasy RPG. Meet Aria, the elven mage with mysterious powers.',
    image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'art',
    creatorId: '1',
    creatorName: 'Luna Art',
    creatorAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 890,
    views: 4560,
    comments: 67,
    createdAt: '2024-01-12',
    tags: ['character design', 'fantasy', 'rpg', 'digital art'],
    externalLinks: {
      demo: 'https://artstation.com/artwork/fantasy-character'
    }
  },
  {
    id: '5',
    title: 'Valorant Montage 2024',
    description: 'Best Valorant clips from this month! Insane headshots and clutch moments.',
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'gaming',
    creatorId: '2',
    creatorName: 'GameMaster Pro',
    creatorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 1680,
    views: 9870,
    comments: 156,
    createdAt: '2024-01-11',
    tags: ['valorant', 'montage', 'fps', 'highlights'],
    externalLinks: {
      video: 'https://youtube.com/watch?v=valorant-montage'
    }
  },
  {
    id: '6',
    title: 'Ocean Waves Ambient',
    description: 'Relaxing ambient track inspired by ocean waves. Perfect for meditation and focus.',
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'music',
    creatorId: '3',
    creatorName: 'Melody Waves',
    creatorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    likes: 423,
    views: 2180,
    comments: 28,
    createdAt: '2024-01-10',
    tags: ['ambient', 'relaxing', 'meditation', 'nature'],
    externalLinks: {
      demo: 'https://soundcloud.com/melodywaves/ocean-waves'
    }
  }
];