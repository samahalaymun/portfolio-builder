import { useEffect, useRef } from "react";
import { api } from "@/lib/axios";
import { useAuth } from "@/features/authentication/context/AuthContext";

export const useAuthBootstrap = () => {
  const { setToken, setIsBootstrapped, setUser } = useAuth();
  const bootstrapped = useRef(false);
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const bootstrap = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setToken(res.data.accessToken);
        // Fetch user profile after successful token refresh
        const userRes = await api.get("/users/me");
        setUser(userRes.data);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapped(true);
      }
    };
    bootstrap();
  }, [setToken, setUser, setIsBootstrapped]);
};
