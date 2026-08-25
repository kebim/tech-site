import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const origin = (process.env.SITE_ORIGIN || "https://example.com").replace(/\/$/, "");
const output = resolve("dist/public");
const routes = ["about", "contact", "privacy", "terms", "editorial", "notes", "news"];

await Promise.all(routes.map(async (route) => {
  const directory = resolve(output, route);
  await mkdir(directory, { recursive: true });
  await cp(resolve(output, "index.html"), resolve(directory, "index.html"));
}));

const sitemap = ["", ...routes]
  .map((route) => `  <url><loc>${origin}${route ? `/${route}` : "/"}</loc></url>`)
  .join("\n");

await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`);
await writeFile(resolve(output, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);

const index = await readFile(resolve(output, "index.html"), "utf8");
if (!index.includes("<div id=\"root\"></div>")) throw new Error("Expected the Vite root document was not generated.");

console.log(`Generated ${routes.length} static route entries and sitemap.xml for ${origin}.`);
