import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import NavItems from "./NavItems";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/features/authentication/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { Separator } from "@/components/ui/separator";

function MobileMainNav() {
  const [open, setOpen] = useState(false);
  const { user, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setToken(null);
      setUser(null);
      queryClient.clear();
      navigate("/");
    },
  });
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
        {user ? (
          // Authenticated: Show Dashboard + Logout
          <div className="flex flex-col gap-4 px-2">
            <Button
              size="sm"
              asChild
              variant="secondary"
              onClick={() => setOpen(!open)}
            >
              <Link to="/builder/start" className="flex items-center gap-2">
                Dashboard
              </Link>
            </Button>
            <div className="w-full flex flex-col ">
              <p className="text-foreground font-medium">{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={() => logout()}
              className="flex justify-between items-center w-full"
            >
              Logout
              <LogOut />
            </button>
            <div className="pt-1.5">
              <Separator />
            </div>
          </div>
        ) : (
          // Unauthenticated: Show Login + Sign up
          <>
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
          </>
        )}
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
