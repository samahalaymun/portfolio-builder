import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/authentication/context/AuthContext";

/**
 * Protects pages for non-authenticated users only
 * Used for: login, signup, home, about, contact
 * If user is logged in, redirect to builder
 */
export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();
  if (accessToken) {
    return <Navigate to="/builder/start" replace />;
  }

  return <>{children}</>;
}
