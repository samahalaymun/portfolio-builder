import { Animated } from "@/components/ui/animated";
import SignInForm from "@/features/authentication/components/SignInForm";

function LoginPage() {
  return (
    <div className=" w-full h-full">
      <Animated variant="flip">
        <SignInForm />
      </Animated>
    </div>
  );
}

export default LoginPage;
