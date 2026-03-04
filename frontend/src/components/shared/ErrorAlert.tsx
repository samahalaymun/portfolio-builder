import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AlertCircleIcon } from 'lucide-react';

function ErrorAlert({error,className}:{error:string; className?: string}) {
  return (
    <Alert variant="destructive" className={cn("max-w-md", className)}>
      <AlertCircleIcon />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}

export default ErrorAlert
