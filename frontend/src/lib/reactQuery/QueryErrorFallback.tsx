import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export function QueryErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="p-6 text-center flex flex-col min-h-screen justify-center items-center gap-4">
      <WifiOff size={48} />
      <h2 className="text-foreground">Something went wrong!</h2>
      <p className="text-muted-foreground">
        {(error as Error).message || "An unexpected error occurred."}
      </p>
      <Button onClick={resetErrorBoundary}> Try again</Button>
    </div>
  );
}
