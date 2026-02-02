import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

function ErrorAlert({error}:{error:string}) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );
}

export default ErrorAlert
