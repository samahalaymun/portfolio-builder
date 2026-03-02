import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, { message: "Name must not exceed 100 characters" }),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string("Current password is required").min(1),
    newPassword: z.string("New password is required").min(7),
    confirmPassword: z.string("Confirm password is required"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
