import { Animated } from "@/components/ui/animated";
import ResetPasswordForm from "@/features/authentication/components/ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <div className="w-full h-full">
      <Animated variant="flip">
        <ResetPasswordForm/>
      </Animated>
    </div>
  );
}

export default ResetPasswordPage
