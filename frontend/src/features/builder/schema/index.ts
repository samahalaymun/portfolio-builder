import { z } from "zod";
/** optional string (allows empty string) */
const optionalString = z.string().optional().or(z.literal(""));

/** optional url (allows empty string) */
const optionalUrl = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine((val) => !val || /^https?:\/\//.test(val), "Invalid URL");

/** optional array (allows empty array) */
const optionalStringArray = z.array(z.string()).optional();
export const imagesSchema = z.object({
  url: z.url(),
  publicId: z.string(),
});
export const projectSchema = z.object({
  title: z
    .string()
    .min(2)
    .max(100, { message: "Title must not exceed 100 characters" })
    .nonempty("Project title is required"),
  description: z
    .string()
    .nonempty("Description is required"),
  technologies: optionalStringArray,
  sourceCode: optionalUrl,
  liveDemo: optionalUrl,
  image: imagesSchema.optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(2).nonempty("Company is required"),
  role: z
    .string()
    .min(2, "Job title is required")
    .nonempty("Job title is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: optionalString,
  description: optionalString,
});
export const socialSchema = z
  .object({
    github: optionalUrl,
    linkedin: optionalUrl,
    twitter: optionalUrl,
  })
  .refine((data) => data.github || data.linkedin || data.twitter, {
    message: "Please fill at least one social link or remove the section",
  });

export const certificationSchema = z.object({
  name: z.string().nonempty(),
  issuer: optionalString,
  year: optionalString,
  url: optionalUrl,
});
export const educationSchema = z.object({
  institution: z.string().nonempty(),
  degree: z.string().nonempty("Degree is required"),
  field: z.string().nonempty("Field is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: optionalString,
  description: optionalString,
});
export const sectionSchema = z.object({
  title: z.string().nonempty(),
  description: optionalString,
  tags: optionalStringArray,
  link: optionalUrl,
  image: optionalUrl,
});
export const contactSchema = z.object({
  socials: socialSchema.optional(),
  email: z.email().nonempty("Email is required"),
  phone: z.string().nonempty("Phone is required"),
  location: z.string().nonempty("location is required"),
});
export const contentSchema = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  role: z.string().nonempty("Role is required"),
  summary: z.string().min(20).max(200).optional(),
  about: z.string().min(50).max(800).optional(),
  contact: contactSchema,
  skills: optionalStringArray,
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  customSections: z.array(sectionSchema).optional(),
  avatar: imagesSchema.optional(),
  cvUrl: optionalUrl,
});

export type ContentFormValues = z.infer<typeof contentSchema>;
// ✅ Export individual types for use in other files
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type CustomSection = z.infer<typeof sectionSchema>;
export type Social = z.infer<typeof socialSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Images = z.infer<typeof imagesSchema>;