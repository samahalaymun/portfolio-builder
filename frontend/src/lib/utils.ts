import { CONTENT_STEPS } from "@/data/constants";
import type { ContentFormValues } from "@/features/builder/schema";
import type { BuilderProfile } from "@/features/builder/store/builder.store";
import { clsx, type ClassValue } from "clsx";
import fs from "fs";
import path from "path";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function mapFormToProfile(
  values: ContentFormValues,
): Partial<BuilderProfile> {
  return {
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    phone: values.phone,
    cvUrl: values.cvUrl,
    role: values.role,
    location: values.location,
    images: values.images,
    summary: values.summary,
    about: values.about,
    skills: values.skills,
    projects: values.projects.map((p) => ({
      title: p.title,
      description: p.description ?? "",
      sourceCode: p.sourceCode,
      liveDemo: p.liveDemo,
      technologies: p.technologies ?? [],
      image: p.image ?? "",
    })),
    experience: values.experience ?? [],
    socials: values.socials ?? {},
  };
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export async function imageFileToBase64(
  file: File,
  options?: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0 → 1
  },
): Promise<string> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.8 } = options || {};

  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      let { width, height } = img;

      // keep aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL("image/jpeg", quality);
      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export function resolveTheme(mode: "light" | "dark" | "system") {
  if (mode === "dark") return "dark";
  if (mode === "light") return "light";
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

export function downloadJSON(data: unknown, filename = "portfolio.json") {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function getCompiledCss() {
  const assetsDir = path.resolve("dist/assets");

  const cssFile = fs.readdirSync(assetsDir).find((f) => f.endsWith(".css"));

  if (!cssFile) throw new Error("CSS file not found");

  return fs.readFileSync(path.join(assetsDir, cssFile), "utf-8");
}
export function clampStep(step: number) {
  return Math.max(0, Math.min(step, CONTENT_STEPS.length - 1));
}