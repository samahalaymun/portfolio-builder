import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Logo from "@/layouts/Logo";

function ErrorPage() {
  const error = useRouteError();

  let statusCode = "404";
  let title = "Page Not Found";
  let message = "The page you are looking for doesn't exist or has been moved.";

  // Detect network/axios offline errors and show friendly offline message
  const errObj = error as any;
  const isNavigatorOffline =
    typeof navigator !== "undefined" && !navigator.onLine;
  const isAxiosNetworkError =
    errObj &&
    (errObj.name === "AxiosError" ||
      errObj.code === "ERR_NETWORK" ||
      /network error/i.test(errObj?.message || ""));
  const isRequestNoResponse = errObj && errObj.request && !errObj.response;

  if (isNavigatorOffline || isAxiosNetworkError || isRequestNoResponse) {
    statusCode = "Offline";
    title = "You are offline";
    message =
      "It looks like you are not connected to the internet. Check your connection and try again.";
  }

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      statusCode = "404";
      title = "Page Not Found";
      message = "The page you are looking for doesn't exist or has been moved.";
    } else {
      statusCode = error.status.toString();
      title = "Something Went Wrong";
      message = error.statusText || "An unexpected error occurred.";
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav
        aria-label="Main navigation"
        className="px-10 py-4 w-full bg-background border-b"
      >
        <div className="flex gap-10 items-center w-full ">
          <Logo />
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center py-20 px-4 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl gap-8">
          {/* Error Code */}
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-8xl lg:text-9xl font-bold text-primary">
              {statusCode}
            </h1>
          </div>

          {/* Title and Message */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {title}!
            </h2>
            <p className="text-secondary-foreground text-base lg:text-lg leading-relaxed">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild variant="default" size="default">
              <Link to="/" className="flex items-center gap-2">
                <Home size={18} />
                Go to Homepage
              </Link>
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <footer>
        <div className="py-6.25 bg-secondary  px-4 lg:px-10">
          <h6 className="font-bold text-secondary-foreground lg:text-start text-center">
            Made With Love By Finland All Right Reserved
          </h6>
        </div>
      </footer>
    </div>
  );
}

export default ErrorPage;
