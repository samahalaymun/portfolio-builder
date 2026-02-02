import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { steps } from "@/data/constants";
import Logo from "@/layouts/Logo";
import { ChevronsLeft } from "lucide-react";

function SideBar({collapse,setCollapse}:{collapse?:boolean;setCollapse:React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <aside
      className={cn(
        "fixed border-r bg-background flex flex-col  left-0 top-0 h-screen space-y-4 ",
        collapse ? "w-16 items-center" : "w-64",
        "transition-width duration-300",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 py-4  text-lg border-b">
        {!collapse && <Logo />}
        <button
          onClick={() => setCollapse(!collapse)}
          className={cn(
            "cursor-pointer text-center p-2 rounded-md hover:bg-muted/80 transition",
            collapse && "rotate-180",)}
        >
          <ChevronsLeft className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto w-full space-y-1">
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
            {!collapse && step.label}
          </NavLink>
        ))}
      </nav>
      {!collapse && (
        <footer className=" px-4 py-5 border-t absolute bottom-0 left-0 right-0">
          <p className="text-muted-foreground">All right reserved 2026</p>
        </footer>
      )}
    </aside>
  );
}

export default SideBar;
