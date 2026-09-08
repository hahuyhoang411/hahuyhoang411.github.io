export const SITE_URL = "https://hahuyhoang411.github.io";
export const SITE_NAME = "Hoang's Space";

/** The static host writes each public route as a directory index. */
export const canonicalPath = (path: string): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return "/";
  return `${normalized.replace(/\/+$/, "")}/`;
};

/** Browser routing accepts old no-slash paths and generated directory paths. */
export const normalizeRoutePath = (path: string): string => {
  if (path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
};

export const blogSlugFromPath = (path: string): string | undefined => {
  const match = normalizeRoutePath(path).match(/^\/blog\/([^/]+)$/);
  return match?.[1];
};
