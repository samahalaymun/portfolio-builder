import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export async function buildFinalCss(themeFile: string): Promise<string> {
  const appCssPath = path.resolve("./src/assets/css/App.css");
  const themeCssPath = path.resolve(`./src/assets/css/themes/${themeFile}`);
  const animationsCssPath = path.resolve("./src/assets/css/animations.css");

  // اقرأ محتوى App.css + ملف الثيم
  const appCss = fs.readFileSync(appCssPath, "utf-8");
  const themeCss = fs.readFileSync(themeCssPath, "utf-8");
  const animationsCss = fs.readFileSync(animationsCssPath, "utf-8");

  const combinedCss = `${appCss}\n${themeCss}\n${animationsCss}`;

  // استخدم PostCSS مع Tailwind + Autoprefixer لتحويله ل CSS عادي
  const result = await postcss([tailwindcss, autoprefixer]).process(
    combinedCss,
    { from: undefined },
  );
  return result.css;
}
