/**
 * Industrial Field Manual deployment reminder: separate GitHub Pages builds use these configured URLs
 * to keep Learn and Tech linked across their independent custom domains.
 */
export type SiteName = "learn" | "tech";

export const siteMode = (import.meta.env.VITE_SITE_MODE as SiteName | undefined) ?? "hub";

function normalized(value: string | undefined) {
  return value ? value.replace(/\/$/, "") : "";
}

export function siteHref(site: SiteName) {
  const configured = site === "learn" ? normalized(import.meta.env.VITE_LEARN_SITE_URL) : normalized(import.meta.env.VITE_TECH_SITE_URL);
  if (configured) return configured;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (site === "learn" && host.startsWith("tech.")) return `${window.location.protocol}//${host.replace(/^tech\./, "learn.")}`;
    if (site === "tech" && host.startsWith("learn.")) return `${window.location.protocol}//${host.replace(/^learn\./, "tech.")}`;
  }

  return `/${site}`;
}
