import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import PreviewThemeToggle from "./PreviewThemeToggle";
import type { NavItem } from "../../types";
import { cn } from "@/lib/utils";
import { useTemplateConfig } from "../../templates/config";

function Header({
  title,
  themeId,
  navItems,
  variant = "default",
}: {
  title: string;
  themeId: string;
  navItems: NavItem[];
  variant?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { config, isLoading } = useTemplateConfig(variant);
  const headerConfig = config?.header;  
  useEffect(() => {
    if (!headerConfig?.sticky) return;
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerConfig?.sticky]);
  
  if (!headerConfig?.show || isLoading || !config) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          // ✅ Clean: No conditionals, just read from config
          "w-full top-0 left-0 z-50 transition-all duration-300",
          headerConfig.sticky ? "fixed" : "relative",
          headerConfig.padding,
          scrolled
            ? headerConfig.background.scrolled
            : headerConfig.background.initial,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between",
            headerConfig.container,
          )}
        >
          <Logo title={title} className={headerConfig.logoSize} />

          {/* Desktop Nav */}
          <nav
            className={cn(
              "hidden md:flex text-sm items-center",
              headerConfig.navGap,
            )}
          >
            {navItems.map((item) => {
              if (!item.label) return null;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={headerConfig.navLinkClass}
                >
                  {item.label}
                </a>
              );
            })}

            {headerConfig.showThemeToggle && (
              <div className={headerConfig.themeToggleBorder}>
                <PreviewThemeToggle themeId={themeId} />
              </div>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {headerConfig.showThemeToggle && (
              <PreviewThemeToggle themeId={themeId} />
            )}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <Menu className="text-muted-foreground" width={20} height={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-background border-r shadow-xl",
          "transform transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 border-b",
            headerConfig.container.split(" ").find((c) => c.startsWith("h-")),
          )}
        >
          <Logo title={title} className={headerConfig.logoSize} />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <X className="text-muted-foreground" width={20} height={20} />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-4 text-sm gap-1">
          {navItems.map((item) => {
            if (!item.label) return null;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Header;
