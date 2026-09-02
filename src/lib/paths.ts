const rawBase = import.meta.env.BASE_URL || "/";

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (rawBase === "/") return normalized;
  const base = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
  return `${base}${normalized}`;
}

export function logicalPath(pathname: string): string {
  const base = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");
  let path = pathname;
  if (base && (path === base || path.startsWith(`${base}/`))) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path = `${path}/`;
  return path;
}

export function pageUrl(pathname: string, site?: URL | string | undefined): string {
  const origin =
    typeof site === "string" ? site.replace(/\/$/, "") : site?.origin ?? "";
  return `${origin}${withBase(pathname)}`;
}

export function alternatePaths(canonicalPath: string): { en: string; zh: string } {
  if (canonicalPath === "/" || canonicalPath === "/zh/") {
    return { en: "/", zh: "/zh/" };
  }
  if (canonicalPath.startsWith("/zh/")) {
    const rest = canonicalPath.replace(/^\/zh/, "") || "/";
    return { en: rest, zh: canonicalPath };
  }
  return { en: canonicalPath, zh: `/zh${canonicalPath}` };
}
