import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://yikunpeng82-sys.github.io",
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "always",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          zh: "zh-CN",
        },
      },
    }),
  ],
});
