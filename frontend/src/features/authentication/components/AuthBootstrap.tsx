import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";
import { useAuth } from "../context/AuthContext";
import AppLoadingScreen from "@/components/shared/AppLoadingScreen";

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
    useAuthBootstrap();
    const { isBootstrapped } = useAuth();
      const isPublicPortfolio = location.pathname.match(/^\/[^\/]+$/);      
    if (!isBootstrapped && !isPublicPortfolio) return <AppLoadingScreen />;
  return <>{children}</>;
}
