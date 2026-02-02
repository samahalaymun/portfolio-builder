
import type { SocialIconProps } from "./types";

function SocialIcon({ icon, to, label }: SocialIconProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      href={to}
      className="p-1.25"
    >
      {icon}
    </a>
  );
}

export default SocialIcon;
