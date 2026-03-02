import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, resolveTheme } from "@/lib/utils";

import { Laptop, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "../../store/builder.store";

function PreviewThemeToggle({
  className,
  themeId,
}: {
  className?: string;
  themeId:string;
}) {
  const { themeMode, setThemeMode } = useThemeStore((s) => s);
  const resolved = resolveTheme(themeMode);

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
        data-theme={themeId}
        className={cn(resolved)}
        align="end"
      >
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            themeMode === "light" && "font-medium text-primary",
          )}
          onClick={() => setThemeMode("light")}
        >
          <Sun size={15} />
          Light
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            themeMode === "dark" && "font-medium text-primary",
          )}
          onClick={() => setThemeMode("dark")}
        >
          <Moon size={15} />
          Dark
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className={cn(
            "flex cursor-pointer items-center gap-2",
            (themeMode === "system" || !themeMode) &&
              "font-medium text-primary",
          )}
          onClick={() => setThemeMode("system")}
        >
          <Laptop size={15} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PreviewThemeToggle;
