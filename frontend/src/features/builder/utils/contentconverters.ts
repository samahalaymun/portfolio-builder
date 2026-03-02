import type { PortfolioContent } from "../types";
import type { ContentFormValues } from "../schema";

/**
 * Converts nested PortfolioContent (from API) to flat ContentFormValues (for form)
 */
export function portfolioContentToFormValues(
  content: PortfolioContent,
): ContentFormValues {
  return {
    // Flatten personalInfo
    firstname: content.personalInfo?.firstname || "",
    lastname: content.personalInfo?.lastname || "",
    role: content.personalInfo?.role || "",
    summary: content.personalInfo?.summary || "",
    cvUrl: content.personalInfo?.cvUrl || "",

    // Direct mappings
    about: content.about || "",
    skills: content.skills || [],
    experience: content.experience || [],
    projects: content.projects || [],
    education: content.education || [],
    certifications: content.certifications || [],
    customSections: content.customSections || [],

    // Contact and avatar
    contact: content.contact || {
      email: "",
      phone: "",
      location: "",
      socials: {},
    },
    avatar: content.avatar || { url: "", publicId: "" },
  };
}

/**
 * Converts flat ContentFormValues (from form) back to nested PortfolioContent (for API)
 */
export function formValuesToPortfolioContent(
  formValues: ContentFormValues,
): PortfolioContent {
  return {
    personalInfo: {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      role: formValues.role,
      summary: formValues.summary,
      cvUrl: formValues.cvUrl,
    },
    about: formValues.about,
    skills: formValues.skills,
    experience: formValues.experience,
    projects: formValues.projects,
    education: formValues.education,
    certifications: formValues.certifications,
    customSections: formValues.customSections,
    contact: formValues.contact,
    avatar: formValues.avatar,
  };
}
