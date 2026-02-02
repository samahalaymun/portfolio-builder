import { cn } from "@/lib/utils";
import type { NavItemsProps } from "../types";
import {  Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Themes", href: "#themes" },
  { label: "How it works", href: "#how-it-works" },
];
function NavItems({ className, stacked ,onClick}: NavItemsProps) {
  
  const { hash } = useLocation();
  return (
    <ul
      className={cn(
        stacked ? "flex flex-col gap-3 w-full" : "flex flex-row gap-3.75",
        className,
      )}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = hash === item.href;

        return (
          <li key={item.label} onClick={onClick}>
            <Link
              to={"/"+item.href}
              className={cn(
                "flex items-center relative  text-muted-foreground transform ease-in duration-100  gap-1.25 px-2 py-1.5 rounded-md font-medium transition-colors",
                "hover:text-primary hover:bg-muted",
                isActive && "text-forground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;
