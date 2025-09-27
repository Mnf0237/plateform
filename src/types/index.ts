export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  verified: boolean;
  category: CreatorCategory;
  socialLinks: SocialLinks;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  likes: number;
  views: number;
  comments: number;
  createdAt: string;
  tags: string[];
  externalLinks?: ExternalLinks;
}

export interface SocialLinks {
  youtube?: string;
  tiktok?: string;
  twitch?: string;
  instagram?: string;
  discord?: string;
  website?: string;
}

export interface ExternalLinks {
  demo?: string;
  github?: string;
  video?: string;
  stream?: string;
}

export type CreatorCategory = 'artist' | 'gamer' | 'youtuber' | 'musician' | 'writer' | 'developer';

export type ProjectCategory = 'art' | 'gaming' | 'video' | 'music' | 'writing' | 'tech' | 'photography' | 'animation';

export type SortOption = 'recent' | 'popular' | 'trending' | 'most-liked';