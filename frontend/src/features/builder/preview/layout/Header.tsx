import { useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import PreviewThemeToggle from "./PreviewThemeToggle";

function Header({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky lg:px-10 px-4 top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="flex items-center justify-between h-16">
        <Logo title={title} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <a
            href="#about"
            className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-muted text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-muted text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Skills
          </a>
          <a
            href="#experience"
            className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-muted text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-muted text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-2 py-1.5 rounded-md hover:text-primary hover:bg-muted text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Contact
          </a>
          <PreviewThemeToggle />
        </nav>
        {/* Mobile Menu Button */}
        <div className="flex gap-2 items-center md:hidden">
          <PreviewThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? (
              <X className="text-muted-foreground" width={20} height={20} />
            ) : (
              <Menu className="text-muted-foreground" width={20} height={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden flex flex-col items-center gap-6 px-4 py-4 text-sm">
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#skills" onClick={() => setOpen(false)}>
            Skills
          </a>
          <a href="#experience" onClick={() => setOpen(false)}>
            Experience
          </a>
          <a href="#projects" onClick={() => setOpen(false)}>
            Projects
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
