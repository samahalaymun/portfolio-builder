function Logo({ title }: { title: string }) {
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
      <span className="font-semibold tracking-wide">
        {title || "Your Name"}
      </span>
    </div>
  );
}

export default Logo;
