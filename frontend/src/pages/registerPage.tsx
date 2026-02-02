import { Animated } from "@/components/ui/animated";
import RegisterForm from "@/features/authintication/components/RegisterForm";

function RegisterPage() {
  return (
    <div className=" w-full py-6">
      <Animated variant="flip">
        <RegisterForm />
      </Animated>
    </div>
  );
}

export default RegisterPage;
