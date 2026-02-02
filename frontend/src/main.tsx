import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.tsx';
import "./assets/css/App.css";
import "./assets/css/animations.css";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from './features/builder/store/theme.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 1️⃣ Dark / Light */}
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* 2️⃣ Design Themes */}
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </NextThemeProvider>
  </StrictMode>,
);
