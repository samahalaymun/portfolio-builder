import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function ContactForm({ recipientEmail }: { recipientEmail?: string }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: recipientEmail,
          reply_to: data.email,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 rounded-xl border border-border bg-muted/40 text-center h-full min-h-[320px]">
        <div className="p-3 rounded-full bg-primary/10">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">Message Sent!</h4>
        <p className="text-sm text-muted-foreground max-w-xs">
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-6 rounded-xl border border-border bg-muted/40"
    >
      <h3 className="text-lg font-semibold text-foreground">Send a Message</h3>

      {/* Name */}
      <Field>
        <FieldLabel
          htmlFor="name"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Name
        </FieldLabel>
        <Input
          {...register("name", { required: "Name is required" })}
          id="name"
          type="text"
          placeholder="John Doe"
          className={cn(
            "w-full px-4 py-2.5 ",
            "focus:border-primary focus:ring-1 focus:ring-primary/30",
            errors.name ? "border-destructive" : "border-border",
          )}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </Field>

      {/* Email */}
      <Field>
        <FieldLabel
          htmlFor="email"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Email
        </FieldLabel>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="john@example.com"
          className={cn(
            "w-full px-4 py-2.5 ",
            "focus:border-primary focus:ring-1 focus:ring-primary/30",
            errors.name ? "border-destructive" : "border-border",
          )}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </Field>

      {/* Message */}
      <Field>
        <FieldLabel
          htmlFor="message"
          className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
        >
          Message
        </FieldLabel>
        <Textarea
          id="message"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
          placeholder="Tell me about your project..."
          rows={5}
          className={cn(
            "w-full px-4 py-2.5 ",
            "focus:border-primary focus:ring-1 focus:ring-primary/30",
            errors.name ? "border-destructive" : "border-border",
          )}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </Field>

      {status === "error" && (
        <p className="text-xs text-destructive text-center">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full mt-1"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <SendHorizonal className="w-4 h-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
