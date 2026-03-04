import { ArrowRight, Mail } from "lucide-react";
import ThemeToggle from "../Navbar/ThemeToggle";
import FooterLogo from "./FooterLogo";
import SocialLinks from "./SocialLinks";
import NewsletterSignup from "./NewsletterSignup";
import { Link } from "react-router-dom";
const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Themes", href: "#themes" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Brand", href: "/brand" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

function Footer() {
  return (
    <footer className="relative bg-secondary/30 border-t border-border overflow-hidden">
      {/* Background pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]
                  bg-[linear-gradient(rgba(var(--color-primary))_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary))_1px,transparent_1px)]
                  bg-size-[48px_48px]"
      />

      <div className="relative">
        {/* ── Main footer content ── */}
        <div className="px-4 lg:px-10 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Top section: Logo + Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-border">
              {/* Left: Branding + tagline */}
              <div className="lg:col-span-5 space-y-4">
                <FooterLogo />
                <p className="text-muted-foreground max-w-sm leading-relaxed">
                  Build beautiful portfolios in minutes. AI-powered, fully
                  customizable, and designed to help you land your dream
                  opportunity.
                </p>
                <SocialLinks />
              </div>

              {/* Right: Newsletter */}
              <div className="lg:col-span-4 lg:col-start-9 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Stay updated</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get the latest themes, tips, and product updates.
                </p>
                <NewsletterSignup />
              </div>
            </div>

            {/* Middle section: Nav links grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12">
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary 
                                     transition-colors duration-200 inline-flex items-center group"
                        >
                          {link.label}
                          <ArrowRight
                            className="w-3 h-3 ml-1 opacity-0 -translate-x-2 
                                                 group-hover:opacity-100 group-hover:translate-x-0 
                                                 transition-all duration-200"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="px-4 lg:px-10 py-6 border-t border-border bg-background/60">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Portify All rights reserved.
            </p>

            {/* Right: Theme toggle + status */}
            <div className="flex items-center gap-6">
              {/* Status indicator */}
              <p
               
                className="flex items-center gap-2 text-sm text-muted-foreground 
                           hover:text-foreground transition-colors group"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full 
                                   bg-green-400 opacity-75"
                  ></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="group-hover:text-primary transition-colors">
                  All systems operational
                </span>
              </p>

              {/* Theme toggle */}
              <ThemeToggle className="text-muted-foreground hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
