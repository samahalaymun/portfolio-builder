import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1).nonempty("Project title is required"),
  description: z.string().nonempty("Description is required"),
  technologies: z.array(z.string()).nonempty("Technolofies is required"),
  sourceCode: z.url().nonempty("Source code is required"),
  liveDemo: z.url().nonempty("Live demo is required"),
  image: z.url("Project image is required"),
});

export const experienceSchema = z.object({
  company: z.string().min(2).nonempty("Company is required"),
  role: z
    .string()
    .min(2, "Job title is required")
    .nonempty("Job title is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
});
export const socialSchema = z.object({
  github: z.url().optional(),
  linkedin: z.url().optional(),
  twitter: z.url().optional(),
});
export const imagesSchema = z.object({
  avatar: z.url("Image is required"),
  cover: z.url().optional(),
});
export const contentSchema = z.object({
  firstname: z.string().nonempty("First name is required"),
  lastname: z.string().min(1).nonempty("Last name is required"),
  email: z.email().nonempty("Email is required"),
  phone: z.string().nonempty("Phone is required"),
  cvUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\//.test(val),
      "Please enter a valid CV URL",
    ),
  role: z.string().nonempty("Role is required"),
  summary: z
    .string()
    .min(30, "Summary is too short")
    .max(160, "Summary is too long")
    .nonempty("Summery is required"),
  about: z
    .string()
    .min(120, "About section is too short")
    .max(600, "About section is too long")
    .nonempty("About is required"),
  location: z.string().nonempty("Location is required"),
  skills: z.array(z.string()).nonempty("Skills is required"),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  socials: socialSchema,
  images: imagesSchema,
});

export type ContentFormValues = z.infer<typeof contentSchema>;
