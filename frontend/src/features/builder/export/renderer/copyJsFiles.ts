import type JSZip from "jszip";

export async function copyJsFiles(zip: JSZip) {
  const jsFiles = ["index-C-4RKOZi.js"]; // أضف أي bundle JS موجود في dist/assets/js

  for (const file of jsFiles) {
    const js = await fetch(`/assets/js/${file}`).then((r) => r.text());
    zip.file(`assets/js/main.js`, js);
  }
}
