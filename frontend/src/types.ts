import type { LucideIcon } from "lucide-react";

export type theme = {
  id: string;
  label: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  size?: "hero" | "tall" | "default";
  visual?: React.ReactNode;
};

