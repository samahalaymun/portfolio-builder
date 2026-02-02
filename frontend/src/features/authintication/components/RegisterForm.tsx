import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const FormSchema = z.object({
  username: z.string().min(4, { message: "Email must be filled." }),
  email: z.email({ message: "Invalid email address." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  confirmPassword: z.string().min(4, {
    message: "Confirm Password must be at least 4 characters.",
  }),
}).superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });;

export default function RegisterForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        password: "",
        username: "",
        email: "",
        confirmPassword: "",
      },
    });
    
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
    ///  handle registration logic here
    console.log(data);
    
    };
  return (
    <form
      className="max-w-md mx-auto space-y-4 bg-card border border-border p-4 rounded-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-center text-second-text font-semibold">
        Create your Portify account
      </h3>

      <Field>
        <FieldLabel htmlFor="username">Full name</FieldLabel>
        <Input
          id="username"
          type="text"
          placeholder="John Doe"
          {...register("username")}
        />
        <p className="text-destructive">{errors.username?.message}</p>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">E-mail</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        <p className="text-destructive">{errors.email?.message}</p>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="password"
        />
        <p className="text-destructive">{errors.password?.message}</p>
      </Field>
      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <Input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="password confirmation"
        />
        <p className="text-destructive">{errors.confirmPassword?.message}</p>
      </Field>
      <div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </div>
      <p>
        Do you have an account?{" "}
        <Link to="/login" className="text-primary">
          Sign In
        </Link>
      </p>
    </form>
  );
}
