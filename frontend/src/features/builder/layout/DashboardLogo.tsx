import { Link } from "react-router-dom";

// Logo for sidebar - supports collapsed state
function DashboardLogo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <Link
        to="/builder/start"
        className="flex items-center justify-center p-3"
      >
        <div
          className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary 
                        flex items-center justify-center shadow-lg shadow-primary/30
                        hover:scale-105 transition-transform"
        >
          <span className="font-black text-lg text-primary-foreground">P</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className="group flex items-center gap-3 px-4 py-3"
    >
      {/* Icon with glow effect */}
      <div className="relative shrink-0">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-primary to-secondary 
                        opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"
        />

        {/* Main icon */}
        <div
          className="relative w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary 
                        flex items-center justify-center
                        group-hover:scale-105 transition-transform duration-300
                        shadow-lg shadow-primary/30"
        >
          <span className="font-black text-lg text-primary-foreground">P</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex items-baseline gap-0.5">
        <span
          className="text-lg font-bold tracking-tight text-foreground 
                         group-hover:text-foreground transition-colors"
        >
          Porti
        </span>
        <span
          className="text-lg font-bold tracking-tight text-primary 
                         group-hover:brightness-110 transition-all"
        >
          fy
        </span>
      </div>
    </Link>
  );
}

export default DashboardLogo;
