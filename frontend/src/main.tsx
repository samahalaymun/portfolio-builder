import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import "./assets/css/App.css";
import "./assets/css/animations.css";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryProvider } from "./lib/reactQuery/QueryProvider.tsx";
import { AuthProvider } from "./features/authentication/context/AuthContext.tsx";
import AuthBootstrap from "./features/authentication/components/AuthBootstrap.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>
        <AuthProvider>
          <AuthBootstrap>
              <RouterProvider router={router} />
          </AuthBootstrap>
        </AuthProvider>
      </QueryProvider>
    </NextThemeProvider>
  </StrictMode>,
);
