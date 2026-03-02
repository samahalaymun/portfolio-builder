import { Button } from "@/components/ui/button";
import AuthMobileLogo from "./AuthMobileLogo";
import BrandingPanel from "./BrandingPanel";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);

 const {
   register,
   handleSubmit,
   formState: { errors },
 } = useForm<ForgotPasswordFormValues>({
   resolver: zodResolver(forgotPasswordSchema),
 });
 const { mutate: sendResetEmail, isPending } = useMutation({
   mutationFn: async (data: ForgotPasswordFormValues) => {
     const res = await api.post("/auth/forgot-password", data);
     return res.data;
   },
   onSuccess: () => {
     setEmailSent(true);
     toast.success("Reset link sent! Check your email.");
   },
   onError: () => {
     toast.error("Failed to send reset link. Please try again.");
   },
 });

 const onSubmit = (data: ForgotPasswordFormValues) => {
   sendResetEmail(data);
 };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel: Branding */}
      <BrandingPanel />

      {/* Right panel: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden">
            <AuthMobileLogo />
          </div>

          {/* Back to login link */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          {!emailSent ? (
            <>
              {/* Header */}
              <div className="space-y-2">
                <h1 className="font-bold text-3xl text-foreground">
                  Forgot password?
                </h1>
                <p className="text-muted-foreground">
                  No worries! Enter your email and we'll send you a reset link.
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
                    disabled={isPending}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-destructive" />
                      {errors.email.message}
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
                      Sending...
                    </>
                  ) : (
                    <>
                      Send reset link
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
                  Check your email
                </h1>
                <p className="text-muted-foreground">
                  We've sent a password reset link to your email address. Click
                  the link to reset your password.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setEmailSent(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          )}

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

export default ForgotPasswordForm
