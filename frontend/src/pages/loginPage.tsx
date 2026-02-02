import { Animated } from "@/components/ui/animated";
import SignInForm from "@/features/authintication/components/SignInForm";

function LoginPage() {
  return (
    <div className=" w-full h-full py-6 ">
      <Animated variant="flip">
        <SignInForm />
      </Animated>
    </div>
  );
}

export default LoginPage;
