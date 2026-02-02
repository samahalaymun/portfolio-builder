import type { ReactNode } from "react";

export type SocialIconProps = {
  icon: ReactNode;
  to: string;
  label?: string;
};
export type NavItemsProps = {
  className?: string;
  onClick?: () => void;
  stacked?: boolean;
};

export type NavItemProps = {
  label?: string;
  to: string;
  icon?: ReactNode;
  onClick?: () => void;
};