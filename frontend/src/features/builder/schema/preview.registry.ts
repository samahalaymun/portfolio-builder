// preview.registry.ts
import Hero from "../preview/sections/Hero";
import About from "../preview/sections/About";
import Skills from "../preview/sections/Skills";
import Projects from "../preview/sections/Projects";
import Contact from "../preview/sections/Contact";
import Qualification from "../preview/sections/Qualification";
export type PreviewSection = {
  id: string;
  component?: React.ComponentType<any>;
  blocks: string[]; // blocks that belong to this preview section
  label?: string;
};

export const PREVIEW_SECTIONS: PreviewSection[] = [
  {
    id: "hero",
    blocks: ["personalInfo"],
    component: Hero,
  },
  {
    id: "about",
    blocks: ["about"],
    component: About,
    label: "About",
  },
  {
    id: "skills",
    blocks: ["skills"],
    component: Skills,
    label: "Skills",
  },
  {
    id: "qualification",
    blocks: ["education", "experience"],
    component: Qualification,
    label: "Qualification",
  },
  {
    id: "projects",
    blocks: ["projects"],
    component: Projects,
    label: "Projects",
  },
  {
    id: "contact",
    blocks: ["contact"],
    component: Contact,
    label: "Contact",
  },
  // certifications: not yet implemented, uncomment when ready
  // {
  //   id: "certifications",
  //   blocks: ["certifications"],
  //   component: Certifications,
  //   label: "Certifications",
  // },
];
