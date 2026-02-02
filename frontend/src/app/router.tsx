import { createBrowserRouter } from "react-router-dom";
import PageContainer from "@/layouts/PageContainer";
import AppLayout from "@/layouts/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import HomePage from "@/pages/homePage";
import AboutPage from "@/pages/aboutPage";
import BuilderLayout from "@/features/builder/layout/BuilderLayout";
import StartPage from "@/features/builder/pages/StartPage";
import ThemePage from "@/features/builder/pages/ThemePage";
import ContentPage from "@/features/builder/pages/ContentPage";
import PreviewPage from "@/features/builder/pages/PreviewPage";
import ExportPage from "@/features/builder/pages/ExportPage";
import PortfolioRoot from "@/features/builder/preview/PortfolioRoot";
import ProtectedPreview from "@/features/builder/pages/ProtectedPreview";
import ContactPage from "@/pages/contactPage";
import LoginPage from "@/pages/loginPage";
import RegisterPage from "@/pages/registerPage";
import AuthContainer from "@/features/authintication/layout/authContainer";


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Public Pages
      {
        element: <AuthContainer />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <RegisterPage /> },

        ],
      },
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
  // Builder Pages
  {
    path: "builder",
    element: <BuilderLayout />,
    children: [
      { index: true, element: <StartPage /> },
      { path: "start", element: <StartPage /> },
      { path: "theme", element: <ThemePage /> },
      { path: "content", element: <ContentPage /> },
      {
        path: "preview",
        element: (
          <ProtectedPreview>
            <PreviewPage />
          </ProtectedPreview>
        ),
      },
      { path: "export", element: <ExportPage /> },
    ],
  },
  {
    path: "preview-frame",
    element: <PortfolioRoot />,
  },
]);
