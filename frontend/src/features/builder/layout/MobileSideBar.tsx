import { steps } from "@/data/constants";
import Logo from "@/layouts/Logo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function MobileSideBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0  z-40 flex h-16 items-center border-b px-4">
        <button onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-background border-r",
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b">
          <Logo />
          <button onClick={() => setOpen(false)} className="text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1">
          {steps.map((step) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-primary/60 text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )
              }
            >
              <step.icon className="h-6 w-6" />
              {step.label}
            </NavLink>
          ))}
        </nav>
        <footer className=" px-4 py-5 border-t absolute bottom-0 left-0 right-0">
          <p className="text-muted-foreground">All right reserved 2026</p>
        </footer>
      </aside>
    </>
  );
}

export default MobileSideBar;
