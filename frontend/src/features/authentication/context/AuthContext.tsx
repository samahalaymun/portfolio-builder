import { queryClient } from "@/lib/reactQuery/QueryProvider";
import { createContext, useCallback, useContext, useState } from "react";

export type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  accessToken: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isBootstrapped: boolean;
  setIsBootstrapped: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Single source of truth for access token (used by axios interceptor)
let globalAccessToken: string | null = null;

export function getAccessToken() {
  return globalAccessToken;
}
export const setAccessToken = (token: string) => {
  globalAccessToken = token;
};
export const clearAccessToken = () => {
  globalAccessToken = null;
};
export const forceLogout = () => {
  clearAccessToken();
  queryClient.clear();
  window.location.href = "/login";
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  // Updates both React state and global variable
  const setToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    globalAccessToken = token;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setToken,
        user,
        setUser,
        isBootstrapped,
        setIsBootstrapped,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
