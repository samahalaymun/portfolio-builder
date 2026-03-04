import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import {
  WifiOff,
  FileSearch,
  ServerCrash,
  Home,
  RefreshCw,
} from "lucide-react";
import Logo from "@/layouts/Logo";
import { Button } from "@/components/ui/button";

type ErrorVariant = "notFound" | "offline" | "server" | "generic";

interface ErrorConfig {
  variant: ErrorVariant;
  statusCode: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  showRefresh: boolean;
}

function getErrorConfig(error: unknown): ErrorConfig {
  const errObj = error as Error & {
    code?: string;
    request?: unknown;
    response?: unknown;
  };

  const isNavigatorOffline =
    typeof navigator !== "undefined" && !navigator.onLine;
  // Only treat as network error if there's NO response (true connectivity issue)
  // A 404 from the server has a response, so it must NOT match here
  const isAxiosNetworkError =
    errObj &&
    errObj.name === "AxiosError" &&
    !errObj.response && // ← key guard: server responded = not a network error
    (errObj.code === "ERR_NETWORK" ||
      /network error/i.test(errObj?.message || ""));
  const isRequestNoResponse = errObj && errObj.request && !errObj.response;

  if (isNavigatorOffline || isAxiosNetworkError || isRequestNoResponse) {
    return {
      variant: "offline",
      statusCode: "Offline",
      title: "No internet connection",
      subtitle: "You appear to be offline",
      description:
        "Check your network connection and try again. Your data is safe and will be available when you reconnect.",
      icon: WifiOff,
      showRefresh: true,
    };
  }

  // Axios 404 from NestJS API (e.g. portfolio not found)
  const axiosStatus = (errObj as any)?.response?.status;
  if (axiosStatus === 404) {
    return {
      variant: "notFound",
      statusCode: "404",
      title: "Portfolio not found",
      subtitle: "This page doesn't exist",
      description:
        "The portfolio you're looking for may have been removed, made private, or the link might be incorrect.",
      icon: FileSearch,
      showRefresh: false,
    };
  }

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        variant: "notFound",
        statusCode: "404",
        title: "Portfolio not found",
        subtitle: "This page doesn't exist",
        description:
          "The portfolio you're looking for may have been removed, made private, or the link might be incorrect.",
        icon: FileSearch,
        showRefresh: false,
      };
    }
    return {
      variant: "server",
      statusCode: error.status.toString(),
      title: "Something went wrong",
      subtitle: error.statusText || "An unexpected error occurred",
      description:
        "Our servers encountered an issue processing your request. Please try again in a moment.",
      icon: ServerCrash,
      showRefresh: true,
    };
  }

  return {
    variant: "generic",
    statusCode: "Error",
    title: "Something went wrong",
    subtitle: "An unexpected error occurred",
    description:
      "We ran into an unexpected problem. Please try refreshing the page or come back later.",
    icon: ServerCrash,
    showRefresh: true,
  };
}

// Animated floating shapes for background
function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-muted/30 blur-3xl" />
    </div>
  );
}

function PublicPortfolioErrorPage() {
  const error = useRouteError();
  const config = getErrorConfig(error);
  const Icon = config.icon;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar */}
      <nav className="relative z-10 px-6 lg:px-10 py-4 w-full border-b bg-background/80 backdrop-blur-sm">
        <Logo />
      </nav>

      {/* Main */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-20 overflow-hidden">
        <BackgroundShapes />

        <div className="relative z-10 max-w-lg w-full text-center space-y-8">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                          bg-destructive/10 border border-destructive/20 text-destructive
                          text-xs font-semibold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            {config.statusCode}
          </div>

          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-150" />
              <div
                className="relative w-24 h-24 rounded-2xl bg-muted border border-border
                              flex items-center justify-center shadow-lg"
              >
                <Icon className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {config.title}
            </h1>
            <p className="text-base text-muted-foreground font-medium">
              {config.subtitle}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {config.description}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">What now?</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>

            {config.showRefresh && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
          </div>

          {/* Help text */}
          <p className="text-xs text-muted-foreground">
            If you think this is a mistake,{" "}
            <Link
              to="/contact"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 border-t bg-background/80 backdrop-blur-sm px-6 lg:px-10">
        <p className="text-sm text-muted-foreground text-center lg:text-start font-medium">
          © {new Date().getFullYear()} Portify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default PublicPortfolioErrorPage;
