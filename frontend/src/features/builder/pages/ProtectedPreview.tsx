import { useBuilderStore } from '../store/builder.store';
import { Navigate } from 'react-router-dom';

function ProtectedPreview({ children }: { children: React.ReactNode }) {
  const profile = useBuilderStore((s) => s.profile);

  if (!profile.firstname || !profile.email || !profile.summary) {
    return <Navigate to="/builder/content" replace />;
  }

  return <>{children}</>;
}

export default ProtectedPreview
