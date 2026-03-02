import { SETTINGS_ITEMS, steps } from "@/data/constants";
import ThemeToggle from "@/layouts/Navbar/ThemeToggle";
import { cn } from "@/lib/utils";
import { LogOut, Menu, X, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuth } from "@/features/authentication/context/AuthContext";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import UserAvatar from "@/components/shared/UserAvatar";
import BuilderLogo from "./BuilderLogo";

function MobileSideBar() {
  const [open, setOpen] = useState(false);
  const [settingCollapse, setSettingCollapse] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUser, user } = useAuth();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      setToken(null);
      setUser(null);
      queryClient.clear();
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b px-4 bg-background">
        <button
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-foreground" />
        </button>

        {/* Logo in mobile header */}
        <BuilderLogo />

      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-background border-r shadow-2xl",
          "transform transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
         
            <div className="flex gap-3 items-center flex-1 min-w-0">
              <UserAvatar
                className="w-10 h-10 shrink-0"
                avatarUrl=""
                username={user?.name}
              />
              <div className="min-w-0 flex-1">
                <h5 className="text-sm font-semibold text-foreground truncate">
                  {user?.name || "User"}
                </h5>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 -mr-2 rounded-lg hover:bg-muted transition-colors shrink-0"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col overflow-y-auto">
          <div className="p-3 space-y-1 flex-1">
            {/* Main navigation */}
            {steps.map((step) => (
              <NavLink
                key={step.path}
                to={step.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )
                }
              >
                <step.icon className="h-5 w-5 shrink-0" />
                <span>{step.label}</span>
              </NavLink>
            ))}

            {/* Settings Section */}
            <div className="pt-2 mt-2 border-t border-border">
              <button
                onClick={() => setSettingCollapse(!settingCollapse)}
                className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                           text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Settings className="h-5 w-5 shrink-0" />
                <span className="flex-1 text-left ml-3">Settings</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    settingCollapse && "rotate-180",
                  )}
                />
              </button>

              {settingCollapse && (
                <div className="mt-1 pl-3 space-y-1">
                  {SETTINGS_ITEMS.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Logout */}
          <div className="p-3 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium 
                         text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <footer className="px-4 py-5 border-t">
          <ThemeToggle />
          <p className="text-muted-foreground mt-4">
            &copy; 2026 All right reserved.
          </p>
        </footer>
      </aside>
    </>
  );
}

export default MobileSideBar;
