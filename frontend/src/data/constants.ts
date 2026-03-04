
import type { ContactReason, FAQ } from "@/features/contact/types";
import {
  Eye,
  FolderUp,
  LayoutTemplate,
  ListStart,
  Lock,
  MessageSquare,
  Palette,
  Sparkles,
  TableOfContents,
  User,
  Zap,
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
export const SETTINGS_ITEMS = [
  { icon: User, label: "User details", path: "/settings/user-details" },
  { icon: Lock, label: "Your access", path: "/settings/user-access" },
  { icon: MessageSquare, label: "Feedback", path: "/settings/user-feedback" },
];
export const steps = [
  { label: "Start", path: "/builder/start", icon: ListStart },
  { label: "Content", path: "/builder/content", icon: TableOfContents },
  { label: "Templates", path: "/builder/templates", icon: LayoutTemplate },
  { label: "Theme", path: "/builder/theme", icon: Palette },
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

export const contactReasons: ContactReason[] = [
  {
    icon: MessageSquare,
    title: "General Inquiry",
    description: "Questions about features, pricing, or how Portify works.",
    action: "Fill the form below",
  },
  {
    icon: Zap,
    title: "Technical Support",
    description: "Need help with your portfolio or experiencing issues.",
    action: "support@portify.io",
  },
  {
    icon: Sparkles,
    title: "Partnerships",
    description: "Interested in collaborating or integrating with Portify.",
    action: "partnerships@portify.io",
  },
];

export const faqs: FAQ[] = [
  {
    question: "How quickly will I get a response?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, our support team aims to respond within 4 hours.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Currently, we provide support via email and our in-app chat for Pro users. Phone support is available for Enterprise customers.",
  },
  {
    question: "Can I schedule a demo?",
    answer:
      "Absolutely! For teams and organizations interested in Portify, we offer personalized demos. Use the form below and select 'Partnership' as your reason.",
  },
  {
    question: "Where is Portify located?",
    answer:
      "We're a remote-first company with team members across the globe. Our headquarters is in San Francisco, CA.",
  },
];
export const START_PAGE_BENEFITS = [
  { icon: Palette, text: "Modern, developer-focused themes" },
  { icon: Sparkles, text: "Smart content editing with AI" },
  { icon: Zap, text: "Instant preview & one-click publish" },
];
export const STEP_QUERY_KEY = "step";
export const STEP_STORAGE_KEY = "content-step";
export const TAB_TITLE:string="Portify";
