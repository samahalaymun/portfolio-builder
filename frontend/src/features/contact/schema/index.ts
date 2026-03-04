import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(200, { message: "Subject must not exceed 200 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(5000, { message: "Message must not exceed 5000 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
