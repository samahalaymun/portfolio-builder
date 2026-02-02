import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z.string().min(4, { message: "Email must be filled." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
export default function SignInForm() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <form
      className="max-w-md mx-auto space-y-4 bg-card border border-border p-4 rounded-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-second-text font-semibold">Login to Portify </h3>
      <Field>
        <FieldLabel htmlFor="email">E-mail</FieldLabel>
        <Input
          {...register("username")}
          id="email"
          type="text"
          placeholder="john do"
        />
        <p className="text-destructive">{errors.username?.message}</p>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
        />
        <p className="text-destructive">{errors.password?.message}</p>
      </Field>

      <div className="flex  justify-end">
        <Link className="underline" to="#">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
      {/* {isError && (
        <p className="text-destructive">
          {error.message || "Invalid credentials"}
        </p>
      )} */}
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
