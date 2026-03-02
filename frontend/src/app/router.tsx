import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import PageContainer from "@/layouts/PageContainer";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/homePage";
import AboutPage from "@/pages/aboutPage";
import BuilderLayout from "@/features/builder/layout/BuilderLayout";
import ContactPage from "@/pages/contactPage";
import AuthContainer from "@/features/authentication/layout/authContainer";
import { RequireAuth } from "@/pages/RequireAuth";
import { GuestOnly } from "@/pages/ProtectAuthPages";
import PublicLayout from "@/layouts/PublicLayout";
import PublicPortfolioPage from "@/features/public/pages/PublicPortfolioPage";
import { PageLoadingSpinner } from "@/components/shared/PageLoadingSpinner";

// ==================== LAZY LOADED (Builder Pages) ====================
const StartPage = lazy(() => import("@/features/builder/pages/StartPage"));
const ThemePage = lazy(() => import("@/features/builder/pages/ThemePage"));
const ContentPage = lazy(() => import("@/features/builder/pages/ContentPage"));
const TemplatesPage = lazy(
  () => import("@/features/builder/pages/TemplatesPage"),
);
const PreviewPage = lazy(() => import("@/features/builder/pages/PreviewPage"));
const ExportPage = lazy(() => import("@/features/builder/pages/ExportPage"));
const TemplateRenderer = lazy(
  () => import("@/features/builder/templates/TemplateRenderer"),
);

// ==================== LAZY LOADED (Auth Pages) ====================
const LoginPage = lazy(() => import("@/pages/loginPage"));
const RegisterPage = lazy(() => import("@/pages/registerPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/forgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/resetPasswordPage"));

// ==================== LAZY LOADED (Settings Pages) ====================
const UserDetailsPage = lazy(
  () => import("@/features/builder/settings/pages/UserDetailsPage"),
);

export const router = createBrowserRouter([
  // Builder Pages - Only for authenticated users
  {
    path: "builder",
    element: (
      <RequireAuth>
        <BuilderLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "start",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <StartPage />
          </Suspense>
        ),
      },
      {
        path: "theme",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <ThemePage />
          </Suspense>
        ),
      },
      {
        path: "content",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <ContentPage />
          </Suspense>
        ),
      },
      {
        path: "templates",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <TemplatesPage />
          </Suspense>
        ),
      },
      {
        path: "preview",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <PreviewPage />
          </Suspense>
        ),
      },
      {
        path: "export",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <ExportPage />
          </Suspense>
        ),
      },
    ],
  },
  //Authentication pages
  {
    element: <AuthContainer />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: (
          <GuestOnly>
            <Suspense fallback={<PageLoadingSpinner />}>
              <LoginPage />
            </Suspense>
          </GuestOnly>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestOnly>
            <Suspense fallback={<PageLoadingSpinner />}>
              <RegisterPage />
            </Suspense>
          </GuestOnly>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestOnly>
            <ForgotPasswordPage />
          </GuestOnly>
        ),
      },
      {
        path: "reset-password",
        element: (
          <GuestOnly>
            <ResetPasswordPage />
          </GuestOnly>
        ),
      },
    ],
  },
  // Public Pages - Only for non-authenticated users
  {
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PageContainer />,
        children: [
          { path: "about", element: <AboutPage /> },
          { path: "contact", element: <ContactPage /> },
          { index: true, element: <HomePage /> },
        ],
      },
    ],
  },
  //Setting pages
  {
    path: "settings",
    element: (
      <RequireAuth>
        <BuilderLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "user-details",
        element: (
          <Suspense fallback={<PageLoadingSpinner />}>
            <UserDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "preview-frame",
    element: <TemplateRenderer />,
    errorElement: <ErrorPage />,
  },
  {
    path: ":username",
    element: <PublicPortfolioPage />,
    errorElement: <ErrorPage />,
  },
]);
