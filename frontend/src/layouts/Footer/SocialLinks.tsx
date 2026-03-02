import { GitHubIcon } from "../SocialIcons/GithubIcon"
import { InstagramIcon } from "../SocialIcons/InstagramIcon"
import { LinkedInIcon } from "../SocialIcons/LinkedInIcon"
import { TwitterIcon } from "../SocialIcons/TwitterIcon"

const socialLinksItems = [
  { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/samah_abulaymun" },
]
function SocialLinks() {
  return (
    <div className="flex gap-2">
      {socialLinksItems.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-9 h-9 rounded-lg border border-border bg-background/60 
                       flex items-center justify-center text-muted-foreground
                       hover:border-primary/50 hover:text-primary hover:bg-primary/5
                       transition-all duration-200 hover:-translate-y-0.5"
          >
            <Icon className="w-4 h-4" fill="var(--color-primary)" />
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks
