import { clsx, type ClassValue } from "clsx";
import fs from "fs";
import path from "path";
import { twMerge } from "tailwind-merge";
import {
  format,
  formatDistanceToNow,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function resolveTheme(mode?: string) {
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

export function formatLastUpdated(date: Date | string) {
  const d = new Date(date);

  const minutes = differenceInMinutes(new Date(), d);
  const hours = differenceInHours(new Date(), d);
  const days = differenceInDays(new Date(), d);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  if (hours < 24) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  if (days < 7) {
    return formatDistanceToNow(d, { addSuffix: true });
  }

  return format(d, "dd MMM yyyy");
}
