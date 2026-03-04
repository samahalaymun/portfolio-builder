import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import BrandingPanel from "./BrandingPanel";
import AuthMobileLogo from "./AuthMobileLogo";
import { ArrowRight } from "lucide-react";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Email must be filled." })
      .max(100, "Username must not exceed 100 characters"),
    email: z.email({ message: "Invalid email address." }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    confirmPassword: z.string().min(4, {
      message: "Confirm Password must be at least 4 characters.",
    }),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export default function RegisterForm() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
    }) => {
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: async (data) => {
      setToken(data.accessToken);
      try {
        const userRes = await api.get("/users/me");
        setUser(userRes.data);
      } catch {}
      navigate("/");
    },
  });
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
    mutate(
      {
        email: data.email,
        password: data.password,
        name: data.username,
      },
      {
        onSuccess: () => {
          toast.success("Sign up successful!");
        }
      },
    );
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <BrandingPanel />
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <AuthMobileLogo />
          </div>
          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bold text-3xl text-foreground">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Start building your professional portfolio in minutes.
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
              <FieldLabel htmlFor="confirmPassword">
                Confirm password
              </FieldLabel>
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="password confirmation"
              />
              <p className="text-destructive">
                {errors.confirmPassword?.message}
              </p>
            </Field>
            {/* Terms agreement */}
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            {isError && (
              <p className="text-destructive">
                {(error as AxiosError<{ message: string }>)?.response?.data
                  ?.message ||
                  error?.message ||
                  "Registration failed"}
              </p>
            )}
            <div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <div
                      className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground 
                                  rounded-full animate-spin mr-2"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
