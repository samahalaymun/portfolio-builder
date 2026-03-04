import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";
import { contactSchema, type ContactFormData } from "../schema";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";
import ErrorAlert from "@/components/shared/ErrorAlert";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await api.post("/contact", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");

      // Reset form and state after 3 seconds
      setTimeout(() => {
        reset();
      }, 3000);
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send message. Please try again.";
      toast.error(message);
    },
  });
  const onSubmit = (data: ContactFormData) => {
    mutate(data);
  };
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Message sent!</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          We've received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field className="space-y-2">
          <FieldLabel htmlFor="name">Name *</FieldLabel>
          <Input
            {...register("name")}
            id="name"
            type="text"
            className="bg-background/60"
            placeholder="Your name"
          />
          {errors.name && (
            <ErrorAlert error={String(errors.name.message)} />
          )}
        </Field>
        <Field className="space-y-2">
          <FieldLabel htmlFor="email">E-mail *</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="text"
            className="bg-background/60"
            placeholder="john@hotmail.com"
          />
          {errors.email && (
            <ErrorAlert error={String(errors.email.message)} />
          )}
        </Field>
      </div>

      <Field className="space-y-2">
        <FieldLabel
          htmlFor="subject"
          className="text-sm font-medium text-foreground"
        >
          Subject *
        </FieldLabel>
        <Input
          {...register("subject")}
          id="subject"
          name="subject"
          placeholder="How can we help?"
          className="bg-background/60"
        />
        {errors.subject && (
          <ErrorAlert error={String(errors.subject.message)} />
        )}
      </Field>

      <Field className="space-y-2">
        <FieldLabel
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Message *
        </FieldLabel>
        <Textarea
          {...register("message")}
          id="message"
          name="message"
          placeholder="Tell us more about your inquiry..."
          rows={6}
          className="bg-background/60 resize-none"
        />
        {errors.message && (
          <ErrorAlert error={String(errors.message.message)} />
        )}
      </Field>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto px-8 shadow-lg shadow-primary/20
                   hover:shadow-xl hover:shadow-primary/30 transition-all"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <div
              className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground 
                            rounded-full animate-spin mr-2"
            />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
export default ContactForm;
