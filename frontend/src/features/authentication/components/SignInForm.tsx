import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useAuth } from "../context/AuthContext";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import BrandingPanel from "./BrandingPanel";
import AuthMobileLogo from "./AuthMobileLogo";

const FormSchema = z.object({
  email: z.string().min(4, { message: "Email must be filled." }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});
export default function SignInForm() {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
 const { mutate, isPending, isError, error } = useMutation({
   mutationFn: async (data: { email: string; password: string }) => {
     const res = await api.post("/auth/login", data);
     return res.data;
   },
   onSuccess: async (data) => {
     setToken(data.accessToken);
     // Fetch and set user after login
     try {
       const userRes = await api.get("/users/me");
       setUser(userRes.data);
     } catch {
       
     }
     navigate(from, { replace: true });
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
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
        }
      },
    );
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* ── Left panel: Branding ── */}

      <BrandingPanel />

      {/* ── Right panel: Form ── */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <AuthMobileLogo />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="font-bold text-3xl text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue building your portfolio.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email field */}
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  {errors.email.message}
                </p>
              )}
            </Field>

            {/* Password field */}
            <Field className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </FieldLabel>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-background/60"
              />
              {errors.password && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-destructive" />
                  {errors.password.message}
                </p>
              )}
            </Field>

            {/* Error message */}
            {isError && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <p className="text-sm text-destructive">
                  {(error as AxiosError<{ message: string }>)?.response?.data
                    ?.message ||
                    error?.message ||
                    "Login failed. Please check your credentials and try again."}
                </p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group"
            >
              {isPending ? (
                <>
                  <div
                    className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground 
                                  rounded-full animate-spin mr-2"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Sign up link */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
