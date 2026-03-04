import type JSZip from "jszip";

export async function copyCssFiles(zip: JSZip, themeId: string) {
    const cssFiles = [
      "App.css",
      "animations.css",
      `themes/${themeId}.css`,
    ];

    let combinedCss = "";

    for (const file of cssFiles) {
      const cssText = await fetch(`/assets/css/${file}`).then((r) => r.text());
      combinedCss += cssText + "\n";
    }

    zip.file("assets/css/App.css", combinedCss);
}
