import PersonalInfoSection from "../components/sections/PersonalInfoSection";
import SkillsSection from "../components/sections/SkillsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import PhotosSection from "../components/sections/PhotosSection";
import type { PortfolioContent } from "../types";
import EductionSection from "../components/sections/EductionSection";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import CertificationsSection from "../components/sections/CertificationsSection";

export type BuilderBlock = {
  id: string;
  label: string;
  form?: React.ComponentType;
  preview?: React.ComponentType<any>;
  fields: string[];
  repeatable?: boolean;
  aiEnabled?: boolean;

  /** 🆕 completion logic */
  required?: boolean;
  isComplete: (content: PortfolioContent) => boolean;
  previewGroup?: "qualification" | "main" | "other";
};

export const BLOCKS_REGISTRY: Record<string, BuilderBlock> = {
  personalInfo: {
    id: "personalInfo",
    label: "Personal Info",
    form: PersonalInfoSection,
    fields: ["firstname", "lastname", "role", "summary"],
    required: true,
    isComplete: (content) =>
      Boolean(
        content.personalInfo?.firstname &&
        content.personalInfo?.lastname &&
        content.personalInfo?.summary &&
        content.personalInfo.role,
      ),
  },

  about: {
    id: "about",
    label: "About",
    form: AboutSection,
    fields: ["about"],
    aiEnabled: true,
    required: true,
    isComplete: (content) => Boolean(content.about),
  },

  skills: {
    id: "skills",
    label: "Skills",
    form: SkillsSection,
    fields: ["skills"],
    repeatable: true,
    required: true,
    isComplete: (content) => Boolean(content.skills?.length),
  },

  experience: {
    id: "experience",
    label: "Experience",
    form: ExperienceSection,
    previewGroup: "qualification",
    fields: ["experience"],
    repeatable: true,
    aiEnabled: true,
    required: false,
    isComplete: (content) => Boolean(content.experience?.length),
  },

  projects: {
    id: "projects",
    label: "Projects",
    form: ProjectsSection,
    fields: ["projects"],
    repeatable: true,
    aiEnabled: true,
    required: false,
    isComplete: (content) =>
      Boolean(
        content.projects?.some((p) => p.title?.trim() && p.description?.trim()),
      ),
  },

  contact: {
    id: "contact",
    label: "Contact",
    form: ContactSection,
    fields: [
      "contact.email",
      "contact.phone",
      "contact.location",
      "contact.socials",
    ],
    required: false,
    isComplete: (content) => {
      const { email, phone, location, socials } = content.contact || {};
      if (!email || !phone || !location) return false;
      if (!socials) return false;
      return Boolean(socials.github || socials.linkedin || socials.twitter);
    },
  },
  education: {
    id: "education",
    label: "Education",
    form: EductionSection,
    previewGroup: "qualification",
    fields: ["education"],
    repeatable: true,
    aiEnabled: true,
    required: false,
    isComplete: (content) => Boolean(content.education?.length),
  },
  certifications: {
    id: "certifications",
    label: "Certifications",
    form: CertificationsSection,
    fields: ["certifications"],
    required: false,
    isComplete: (content) => Boolean(content.certifications?.length),
  },
  photos: {
    id: "photos",
    label: "Photos",
    form: PhotosSection,
    fields: ["avatar"],
    required: false,
    isComplete: (content) => Boolean(content.avatar?.publicId),
  },
};
