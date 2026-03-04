import { useAuth } from "@/features/authentication/context/AuthContext";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { accessToken, isBootstrapped } = useAuth();
  const location = useLocation();

  // Wait for bootstrap to complete
  if (!isBootstrapped) {
    return null;
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
