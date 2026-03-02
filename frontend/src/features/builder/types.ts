import type {
  Project,
  Experience,
  Education,
  Certification,
  CustomSection,
  Images,
  Contact,
} from "@/features/builder/schema/index";

export type {
  Project,
  Experience,
  Education,
  Certification,
  CustomSection,
  Images,
  Contact,
};

export interface UpdatePortfolioContentPayload {
  content: {
    sectionsOrder?: string[];
    personalInfo: {
      firstname: string;
      lastname: string;
      cvUrl?: string;
      role?: string;
      summary?: string;
    };
    contact?: Contact;
    about?: string;
    skills?: string[];
    experience?: Experience[];
    projects?: Project[];
    education?: Education[];
    certifications?: Certification[];
    customSections?: CustomSection[];
    avatar?: Images;
  };
}

export type PortfolioContent = {
  personalInfo: {
    firstname: string;
    lastname: string;
    cvUrl?: string;
    role?: string;
    summary?: string;
  };
  contact?: Contact;
  about?: string;
  skills?: string[];
  experience?: Experience[];
  projects?: Project[];
  education?: Education[];
  certifications?: Certification[];
  customSections?: CustomSection[];
  avatar?: Images;
  sectionsOrder?: string[];
  [key: string]: any; // For flexibility
};
export interface BuilderProfile {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  cvUrl: string;
  role: string;
  summary: string;
  about: string;
  location: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  images: {
    avatar?: string;
    cover?: string;
  };
  theme: "light" | "dark" | "system";
}
export interface UpdatePortfolioThemePayload {
  theme?: string;
}
export type NavItem = {
  id: string;
  label?: string;
  href: string;
};

export interface Template {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}