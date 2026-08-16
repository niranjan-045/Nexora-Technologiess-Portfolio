export interface Settings {
  companyName: string;
  logoUrl: string;
  faviconUrl?: string;
  heroImage: string;
  aboutImage: string;
  heroRoles: string[];
  heroDesc: string;
  aboutBio: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  primaryColor?: string;
  secondaryColor?: string;
  socials: {
    linkedin?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface Service {
  id?: string;
  title: string;
  desc: string;
  icon: string;
}

export interface Skill {
  id?: string;
  name: string;
  pct: number;
}

export interface TechIcon {
  name: string;
  icon: string;
}

export interface ProcessStep {
  id?: string;
  title: string;
  desc: string;
}

export interface Faq {
  id?: string;
  q: string;
  a: string;
}

export interface Project {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string;
  tech: string[];
  github?: string;
  website?: string;
  featured?: boolean;
}

export interface Review {
  id?: string;
  name: string;
  role?: string;
  message: string;
  rating: number;
  approved: boolean;
  photo?: string;
  createdAt?: unknown;
}
