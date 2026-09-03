import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMeta } from "../../utils/seo";

/**
 * Keeps <title> and <meta name="description"> in sync with the active route.
 * Mounted once inside RootLayout; covers static routes and feature slugs.
 */
export default function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = getMeta(pathname);
    document.title = title;

    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [pathname]);

  return null;
}
