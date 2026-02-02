import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, resolveTheme } from "@/lib/utils";

import { Laptop, Moon, Sun } from "lucide-react";
import { useBuilderStore } from "../../store/builder.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function PreviewThemeToggle({ className }: { className?: string }) {
  const { profile, setTheme } = useBuilderStore();
  const resolved = resolveTheme(profile.theme.mode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            `
              transition-colors
              hover:bg-muted hover:text-primary
            `,
            className,
          )}
          variant="ghost"
          size="icon-sm"
        >
          {resolved !== "dark" ? (
            <Sun
              size={15}
              className={`
              transition-all duration-300
            `}
            />
          ) : (
            <Moon
              size={15}
              className={`
                transition-all duration-300
            `}
            />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        data-theme={profile.theme.id}
        className={cn(resolved)}
        align="end"
      >
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            profile.theme.mode === "light" && "font-medium text-primary",
          )}
          onClick={() => setTheme({ mode: "light" })}
        >
          <Sun size={15} />
          Light
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            profile.theme.mode === "dark" && "font-medium text-primary",
          )}
          onClick={() => setTheme({ mode: "dark" })}
        >
          <Moon size={15} />
          Dark
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            (profile.theme.mode === "system" || !profile.theme.mode) &&
              "font-medium text-primary",
          )}
          onClick={() => setTheme({ mode: "system" })}
        >
          <Laptop size={15} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PreviewThemeToggle;
