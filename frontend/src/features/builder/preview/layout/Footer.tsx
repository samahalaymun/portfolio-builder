// Footer.tsx
import { GitHubIcon } from "@/layouts/SocialIcons/GithubIcon";
import { LinkedInIcon } from "@/layouts/SocialIcons/LinkedInIcon";
import { TwitterIcon } from "@/layouts/SocialIcons/TwitterIcon";
import type { NavItem } from "../../types";
import { useTemplateConfig } from "../../templates/config";
import { cn } from "@/lib/utils";

type FooterProps = {
  firstname?: string;
  lastname?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
  role?: string;
  navLinks: NavItem[];
  variant?: string;
};

function Footer({
  firstname,
  lastname,
  socials,
  role,
  navLinks,
  variant = "default",
}: FooterProps) {
  const fullName = [firstname, lastname].filter(Boolean).join(" ");
 const {config,isLoading} = useTemplateConfig(variant);
 const footerConfig = config?.footer;

 // ✅ No footer for minimal template
 if (!footerConfig?.show || !config || isLoading) {
   return null;
 }
  return (
    <footer className={footerConfig.background}>
      <div className={cn(footerConfig.container, footerConfig.padding)}>
        <div className={footerConfig.contentLayout}>
          {/* Identity */}
          {footerConfig.showIdentity && (
            <div className={footerConfig.identityClass}>
              {fullName && (
                <h3 className={footerConfig.nameClass}>{fullName}</h3>
              )}
              {role && <p className={footerConfig.roleClass}>{role}</p>}
            </div>
          )}

          {/* Nav */}
          {footerConfig.showNav && (
            <div className={footerConfig.navLayout}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={footerConfig.navLinkClass}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Socials */}
          {footerConfig.showSocials && socials && (
            <div className={footerConfig.socialsLayout}>
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className={footerConfig.socialLinkClass}
                >
                  <TwitterIcon fill="currentColor" />
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={footerConfig.socialLinkClass}
                >
                  <GitHubIcon fill="currentColor" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={footerConfig.socialLinkClass}
                >
                  <LinkedInIcon fill="currentColor" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        {footerConfig.showBottomBar && (
          <div className={footerConfig.bottomBarClass}>
            © {new Date().getFullYear()} Built with Portify
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
