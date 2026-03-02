import type { MessageSquare } from "lucide-react";

export type ContactReason = {
  icon: typeof MessageSquare;
  title: string;
  description: string;
  action: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
