import { Link } from "react-router-dom";

function BuilderLogo() {
  return (
    <Link to="/" className="group">
      {/* Stacked layers icon */}
      <div className="relative overflow-hidden">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-primary to-secondary 
                        opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300"
        />

        {/* Icon container */}
        <div className="relative w-11 h-11  flex items-center justify-center">
          {/* Layer 3 (back) */}
          <div
            className="absolute w-9 h-7 rounded-lg bg-primary/20 
                          translate-x-1 translate-y-1 rotate-3"
          />

          {/* Layer 2 (middle) */}
          <div
            className="absolute w-9 h-7 rounded-lg bg-primary/40 
                          translate-x-0.5 translate-y-0.5 rotate-1"
          />

          {/* Layer 1 (front) - main gradient */}
          <div
            className="relative w-9 h-7 rounded-lg bg-linear-to-br from-primary to-secondary 
                          flex items-center justify-center
                          group-hover:scale-105 transition-transform duration-300
                          shadow-lg shadow-primary/30"
          >
            <svg
              className="w-4 h-4 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BuilderLogo
