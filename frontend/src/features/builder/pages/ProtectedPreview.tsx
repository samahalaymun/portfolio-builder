import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

function ProtectedPreview({ children }: { children: React.ReactNode }) {
  const { data: portfolio, isFetching } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });

  const personalInfo = portfolio?.content.personalInfo;

  if (
    !personalInfo?.firstname ||
    !personalInfo?.email ||
    !personalInfo?.summary
  ) {
    return <Navigate to="/builder/content" replace />;
  }

  return <>{children}</>;
}

export default ProtectedPreview
