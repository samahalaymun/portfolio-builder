import { useEffect } from "react";

interface MetaOptions {
  title?: string;
  description?: string;
  image?: string;
}

export function useDocumentMeta({ title, description, image }: MetaOptions) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMetaTag("og:title", title);
    }

    if (description) {
      setMetaTag("description", description, "name");
      setMetaTag("og:description", description);
    }

    if (image) {
      setMetaTag("og:image", image);
       setFavicon(image);
    }

    setMetaTag("og:type", "profile");
  }, [title, description, image]);
}

function setMetaTag(
  name: string,
  content: string,
  attr: "name" | "property" = "property",
) {
  let element = document.querySelector(`meta[${attr}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}
function setFavicon(url: string) {
  let link = document.querySelector(
    "link[rel='icon']",
  ) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.type = "image/png";
  link.href = url;
}
