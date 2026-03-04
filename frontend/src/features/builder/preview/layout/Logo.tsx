import { cn } from "@/lib/utils";

function Logo({ title, className }: { title: string; className?:string; }) {
  const initials = title ? getInitials(title) : "ME";
  function getInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }
  return (
    <div className="flex items-center gap-2 uppercase">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
        {initials}
      </div>
      <span className={cn("tracking-wide",className)}>
        {title || "Your Name"}
      </span>
    </div>
  );
}

export default Logo;
