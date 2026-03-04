import BrandingPanel from "./BrandingPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import AuthMobileLogo from "../components/AuthMobileLogo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [resetSuccess, setResetSuccess] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ResetPasswordFormValues>({
      resolver: zodResolver(resetPasswordSchema),
    });

    const { mutate: resetPassword, isPending } = useMutation({
      mutationFn: async (data: ResetPasswordFormValues) => {
        const res = await api.post("/auth/reset-password", {
          token,
          password: data.password,
        });
        return res.data;
      },
      onSuccess: () => {
        setResetSuccess(true);
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 3000);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || "Failed to reset password",
        );
      },
    });

     const onSubmit = (data: ResetPasswordFormValues) => {
       if (!token) {
         toast.error("Invalid reset link");
         return;
       }
       resetPassword(data);
     };
 if (!token) {
   return (
     <div className="min-h-screen flex items-center justify-center p-4">
       <div className="text-center space-y-4">
         <h1 className="text-2xl font-bold text-foreground">Invalid Link</h1>
         <p className="text-muted-foreground">
           This password reset link is invalid or has expired.
         </p>
         <Link to="/forgot-password">
           <Button>Request New Link</Button>
         </Link>
       </div>
     </div>
   );
 }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <BrandingPanel />
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <AuthMobileLogo />
          </div>

          {!resetSuccess ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h1 className="font-bold text-3xl text-foreground">
                  Reset your password
                </h1>
                <p className="text-muted-foreground">
                  Enter your new password below.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Password field */}
                <Field>
                  <FieldLabel htmlFor="password">New password</FieldLabel>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                {/* Confirm password field */}
                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm password
                  </FieldLabel>
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    disabled={isPending}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </Field>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group"
                >
                  {isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            // Success state
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="font-bold text-2xl text-foreground">
                  Password reset successful!
                </h1>
                <p className="text-muted-foreground">
                  Your password has been reset. Redirecting to login...
                </p>
              </div>
            </div>
          )}

          {/* Back to login */}
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
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

export default ResetPasswordForm
