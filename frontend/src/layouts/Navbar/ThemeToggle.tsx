
import { cn } from "@/lib/utils";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
const Item = ({
  value,
  icon,
  label,
}: {
  value: "light" | "dark" | "system";
  icon: React.ReactNode;
  label: string;
}) => {
  const isActive = theme === value || (!theme && value === "system");
  return (
    <button
      onClick={() => setTheme(value)}
      className={cn(
        `
            relative flex h-8 w-8 items-center justify-center
            rounded-full transition-all
          `,
        isActive
          ? "bg-background shadow text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
};
  return (
    <div
      className={cn(
        `
          inline-flex items-center gap-1 rounded-full
          border bg-muted p-1
        `,
        className,
      )}
    >
      <Item value="system" label="System" icon={<Laptop size={16} />} />
      <Item value="light" label="Light" icon={<Sun size={16} />} />
      <Item value="dark" label="Dark" icon={<Moon size={16} />} />
    </div>
  );
}

export default ThemeToggle;
