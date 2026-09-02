import type { APIRoute } from "astro";
import { withBase } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(
    withBase("/sitemap-index.xml"),
    site ?? "https://yikunpeng82-sys.github.io",
  ).href;
  const body = [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${sitemap}`, ``].join("\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
