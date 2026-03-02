import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { isApiError } from "./types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30, // 30 min
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,
      throwOnError: true,
      retry: (failureCount, error) => {
        if (isApiError(error) && error.status === 404) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

export const QueryProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
