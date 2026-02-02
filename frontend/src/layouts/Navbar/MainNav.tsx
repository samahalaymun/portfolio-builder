
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import NavItems from "./NavItems";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

function MainNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="
        sticky top-0 z-50 w-full
        bg-background/80 backdrop-blur
        border-b border-border
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-4">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Logo />
          <NavItems className="hidden lg:flex flex-row gap-6 text-sm font-medium" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <NavLink
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
          <Button size="sm" asChild variant="secondary">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
