import { resolveTheme } from "@/lib/utils";
import type { BuilderProfile } from "../../types";
import { useThemeStore } from "../../store/builder.store";

export function renderHtml(profile:BuilderProfile):string {
    const {themeMode} = useThemeStore((s)=>s);
    const mode = resolveTheme(themeMode) ?? "light";
    const themeId = profile.theme;
  // const body = renderToStaticMarkup(
  //   <PortfolioRoot
  //     data={profile}
  //     theme={{
  //       id: themeId,
  //       mode: mode,
  //     }}
  //   />,
  // );
  return `<!DOCTYPE html>
<html lang="en" class="${mode === "dark" ? "dark" : ""}" data-theme="${themeId}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${profile?.firstname + " " + profile?.lastname}</title>
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/App.css" />
  </head>
  <body>
  
     <script src="assets/js/main.js"></script>
  </body>
</html>`;
}
