import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import NavItems from "./NavItems";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/authentication/context/AuthContext";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import AuthUser from "./AuthUser";

function MainNav() {
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
          {user ? (
            // Authenticated: Show Dashboard + Logout
            <>
              <Button size="sm" asChild variant="secondary">
                <Link to="/builder/start" className="flex items-center gap-2">
                  Dashboard
                </Link>
              </Button>
              <AuthUser onLogout={() => logout()} user={user} />
            </>
          ) : (
            // Unauthenticated: Show Login + Sign up
            <>
              <Button size="sm" asChild variant="secondary">
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
