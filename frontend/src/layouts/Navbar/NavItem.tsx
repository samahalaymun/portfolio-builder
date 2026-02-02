import { NavLink } from "react-router-dom";
import type { NavItemProps } from "../types";
import { cn } from "@/lib/utils";

function NavItem({ label, to, icon, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center  text-muted-foreground transform ease-in duration-100  gap-1.25 px-2 py-1.5 rounded-md font-bold transition-colors",
          "hover:text-primary hover:bg-muted hover:scale-110",
          isActive && "text-forground"
        )
      }
    >
      {label}
      {icon}
    </NavLink>
  );
}

export default NavItem
