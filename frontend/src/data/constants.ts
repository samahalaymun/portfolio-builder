import {
  Eye,
  FolderUp,
  ListStart,
  Palette,
  TableOfContents,
} from "lucide-react";

export const THEMES = [
  { id: "default", label: "Default" },
  { id: "claymorphism", label: "Claymorphism" },
  { id: "bold-tech", label: "Bold" },
  { id: "amethyst", label: "Amethyst Haze" },
  { id: "bubblegum", label: "Bubblegum" },
  { id: "amber-minimal", label: "Amber Minimal" },
  { id: "caffeine", label: "Caffeine" },
  { id: "claude", label: "Claude" },
  { id: "mono", label: "Mono" },
  { id: "twitter", label: "Twitter" },
  { id: "vercel", label: "Vercel" },
];

export const steps = [
  { label: "Start", path: "/builder/start", icon: ListStart },
  { label: "Theme", path: "/builder/theme", icon: Palette },
  { label: "Content", path: "/builder/content", icon: TableOfContents },
  { label: "Preview", path: "/builder/preview", icon: Eye },
  { label: "Export", path: "/builder/export", icon: FolderUp },
];
export const CONTENT_STEPS = [
  {
    id: "personal",
    title: "Personal Info",
    fields: [ "firstname", "lastname", "email", "phone", "location","role"],
  },
  {
    id: "about",
    title: "About",
    fields: ["summary", "about"],
  },
  {
    id: "skills",
    title: "Skills",
    fields: ["skills"],
  },
  {
    id: "experience",
    title: "Experience",
    fields: ["experience"],
  },
  {
    id: "projects",
    title: "Projects",
    fields: ["projects"],
  },
  {
    id: "socials",
    title: "Social & Images",
    fields: ["socials", "images"],
  },
];
export const STEP_QUERY_KEY = "step";
export const STEP_STORAGE_KEY = "content-step";
export const TAB_TITLE:string="Portify"