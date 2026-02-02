import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import NavItems from "./NavItems";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function MobileMainNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Main navigation"
      className="
        sticky top-0 z-50 w-full
        bg-background/80 
        border-b border-border"
    >
      <div className="flex items-center justify-between p-4 ">
        <Logo />
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <X className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-muted-foreground" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "flex flex-col  gap-4 p-4 transition-transform duration-300 ease-in-out bg-background",
          open ? "translate-x-0" : "-translate-x-full hidden",
        )}
      >
        <Button
          onClick={() => setOpen(!open)}
          size="sm"
          asChild
          variant="secondary"
        >
          <Link to="/login">Login</Link>
        </Button>
        <Button onClick={() => setOpen(!open)} size="sm" asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
        <NavItems
          onClick={() => setOpen(!open)}
          stacked={true}
          className="gap-4 text-sm font-medium"
        />

        <NavLink
          onClick={() => setOpen(!open)}
          className={({ isActive }) =>
            cn(
              "flex items-center relative  text-muted-foreground transform ease-in duration-100  gap-1.25 px-2 py-1.5 rounded-md font-medium transition-colors",
              "hover:text-primary hover:bg-muted",
              isActive && "text-forground",
            )
          }
          to="contact"
        >
          Contact
        </NavLink>
        <div className="flex justify-between ">
          <span className="text-muted-foreground gap-1.25 px-2 py-1.5">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default MobileMainNav;
