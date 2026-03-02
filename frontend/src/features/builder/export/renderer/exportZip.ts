import JSZip from "jszip";
import { renderHtml } from "./renderHtml";
import { copyJsFiles } from "./copyJsFiles";
import type { BuilderProfile } from "../../types";

export async function exportPortfolio(profile: BuilderProfile) {
  const zip = new JSZip();

  // 1️⃣ HTML
  zip.file("index.html", renderHtml(profile));

  // 2️⃣ CSS 
 
  await copyJsFiles(zip);

  // 3️⃣ Generate zip
  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}
