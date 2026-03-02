import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SETTINGS_ITEMS, steps } from "@/data/constants";
import { ChevronsLeft, LogOut, Settings, ChevronDown } from "lucide-react";
import ThemeToggle from "@/layouts/Navbar/ThemeToggle";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuth } from "@/features/authentication/context/AuthContext";
import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { useState } from "react";
import UserAvatar from "@/components/shared/UserAvatar";

function SideBar({
  collapse,
  setCollapse,
}: {
  collapse?: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { setToken, setUser, user } = useAuth();
  const [settingCollapse, setSettingCollapse] = useState(false);

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
  };

  return (
    <aside
      className={cn(
        "fixed border-r bg-background flex flex-col left-0 top-0 h-screen",
        collapse ? "w-16 items-center" : "w-64",
        "transition-width duration-300",
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 mb-4">
          <div
            className={cn(
              "flex gap-3 items-center flex-1 min-w-0",
              collapse && "hidden",
            )}
          >
            {/* User Avatar */}
            <UserAvatar
              className="w-10 h-10"
              avatarUrl=""
              username={user?.name}
            />
            {/* User Info */}
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
          onClick={() => setCollapse(!collapse)}
          className={cn(
            "cursor-pointer text-center p-2 rounded-md hover:bg-muted/80 transition shrink-0",
            collapse && "rotate-180",
          )}
        >
          <ChevronsLeft className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-3 space-y-1 flex-1">
          {/* Main navigation items */}
          {steps.map((step) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  collapse && "justify-center",
                )
              }
              title={collapse ? step.label : undefined}
            >
              <step.icon className="h-5 w-5 shrink-0" />
              {!collapse && <span>{step.label}</span>}
            </NavLink>
          ))}

          {/* Settings Section */}
          <div className="pt-2 mt-2 border-t border-border">
            <button
              onClick={() => setSettingCollapse(!settingCollapse)}
              className={cn(
                "flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapse && "justify-center",
              )}
              title={collapse ? "Settings" : undefined}
            >
              <Settings className="h-5 w-5 shrink-0" />
              {!collapse && (
                <>
                  <span className="flex-1 text-left ml-3">Settings</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      settingCollapse && "rotate-180",
                    )}
                  />
                </>
              )}
            </button>

            {/* Settings dropdown */}
            {settingCollapse && (
              <div className="mt-1 pl-3 space-y-1">
                {SETTINGS_ITEMS.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.label}
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
                   {!collapse&& <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout button */}
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full",
              "text-destructive hover:bg-destructive/10",
              collapse && "justify-center",
            )}
            title={collapse ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapse && <span>Logout</span>}
          </button>
        </div>
      </nav>

      {!collapse && (
        <footer className="px-4 py-5 border-t">
          <ThemeToggle />
          <p className="text-muted-foreground mt-4">
            &copy; 2026 All right reserved.
          </p>
        </footer>
      )}
    </aside>
  );
}

export default SideBar;
