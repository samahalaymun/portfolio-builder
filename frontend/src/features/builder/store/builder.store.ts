import { create } from "zustand";

export interface BuilderTheme {
  id: string; // theme name
  mode: "light" | "dark" | "system";
}

export interface Project {
  title: string;
  description: string;
  sourceCode?: string;
  liveDemo?: string;
  image?: string;
  technologies: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

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
  theme: BuilderTheme;
}
interface BuilderState {
  profile: BuilderProfile;

  updateProfile: (data: Partial<BuilderProfile>) => void;
  setTheme: (theme: Partial<BuilderTheme>) => void;
}
const defaultProfile: BuilderProfile = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  location: "",
  role: "",
  cvUrl: "",
  summary: "",
  about: "",
  skills: [],
  projects: [],
  experience: [],
  socials: {},
  images: {},
  theme: {
    id: "default",
    mode: "system",
  },
};

export const useBuilderStore = create<BuilderState>((set) => ({
  profile: (() => {
    const stored = localStorage.getItem("profile");
    return stored ? JSON.parse(stored) : defaultProfile;
  })(),

  updateProfile: (data) =>
    set((state) => {
      const updated = { ...state.profile, ...data };
      localStorage.setItem("profile", JSON.stringify(updated));
      return { profile: updated };
    }),

  setTheme: (theme) =>
    set((state) => {
      const updated = {
        ...state.profile,
        theme: {
          ...state.profile.theme,
          ...theme,
        },
      };
      localStorage.setItem("profile", JSON.stringify(updated));
      return { profile: updated };
    }),
}));
