import { Animated } from "@/components/ui/animated";
import RegisterForm from "@/features/authentication/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-full h-full">
      <Animated variant="flip">
        <RegisterForm />
      </Animated>
    </div>
  );
}

export default RegisterPage;
