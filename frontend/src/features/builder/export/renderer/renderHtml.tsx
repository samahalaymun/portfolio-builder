import { renderToStaticMarkup } from "react-dom/server";
import  PortfolioRoot  from "@/portfolio/PortfolioRoot";
import type { BuilderProfile } from "../../store/builder.store";
import { resolveTheme } from "@/lib/utils";

export function renderHtml(profile:BuilderProfile):string {
    const mode = resolveTheme(profile.theme.mode) ?? "light";
    const themeId = profile.theme.id;
  const body = renderToStaticMarkup(
    <PortfolioRoot
      data={profile}
      theme={{
        id: themeId,
        mode: mode,
      }}
    />,
  );
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
    ${body}
     <script src="assets/js/main.js"></script>
  </body>
</html>`;
}
