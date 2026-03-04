import UserAvatar from "@/components/shared/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import type { User as UserProp } from "@/features/authentication/context/AuthContext";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function AuthUser({
  user,
  className,
  onLogout,
}: {
  user?: UserProp;
  className?: string;
  onLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "transition-colors hover:bg-muted hover:text-primary text-sm font-medium",
            className,
          )}
        >
          <UserAvatar
            className="w-12 h-12"
            avatarUrl=""
           
          />
          <span className="sr-only">Auth User</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="py-3">
        <DropdownMenuItem
          className={cn("flex cursor-pointer items-center gap-2")}
        >
          <div className="w-full flex flex-col">
            <p className="text-foreground font-medium">{user?.name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("flex cursor-pointer items-center gap-2")}
        >
          <Link to="/builder/start" className="flex  items-center gap-2">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <div className="py-2">
          <Separator />
        </div>
        <DropdownMenuItem>
          <div className="flex justify-between items-center w-full">
            <p className="text-muted-foreground">Theme</p>
            <ThemeToggle />
          </div>
        </DropdownMenuItem>
        <div className="py-2">
          <Separator />
        </div>
        <DropdownMenuItem
          className={cn("flex cursor-pointer items-center gap-2")}
          onClick={onLogout}
        >
          <div className="flex justify-between items-center w-full">
            Logout
            <LogOut />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AuthUser;
