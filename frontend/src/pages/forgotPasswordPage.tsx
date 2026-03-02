import { Animated } from "@/components/ui/animated";
import ForgotPasswordForm from "@/features/authentication/components/ForgotPasswordForm";

function ForgotPasswordPage() {
  return (
    <div className=" w-full h-full">
      <Animated variant="flip">
        <ForgotPasswordForm/>
      </Animated>
    </div>
  );
}

export default ForgotPasswordPage;
