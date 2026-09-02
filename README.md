# Kunpeng Yi / 易昆鹏

Statically generated academic website for Associate Professor Kunpeng Yi (易昆鹏; institutional pages also list 伊坤朋), Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences / 中国科学院生态环境研究中心.

## GitHub Pages preview

Preview URL (project Pages, not a custom domain, not an official public launch):

**https://yikunpeng82-sys.github.io/kunpeng-yi-website/**

Chinese home: https://yikunpeng82-sys.github.io/kunpeng-yi-website/zh/  
Publications: https://yikunpeng82-sys.github.io/kunpeng-yi-website/publications/

This is a **project site**. Astro `site` is `https://yikunpeng82-sys.github.io` and `base` must be `/kunpeng-yi-website/` so assets and routes resolve under that prefix. The GitHub Actions workflow in `.github/workflows/pages.yml` builds `dist/` and deploys with `configure-pages` + `upload-pages-artifact` + `deploy-pages`.

In the repository: **Settings → Pages → Source: GitHub Actions**.

## Stack

- Astro 5 + TypeScript
- Fully static output (`astro build`)
- English at `/` (served as `/kunpeng-yi-website/` on Pages), Chinese at `/zh/`
- Publications at `/publications/` and `/zh/publications/`
- One publication seed file: `src/data/publications.ts` (no live Scholar scrape)

## Local run

Requires Node.js 22+. Because `base` is `/kunpeng-yi-website/`, the local app is not at the server root.

```bash
npm install
npm run dev
```

Open `http://localhost:4321/kunpeng-yi-website/`.

Useful commands:

```bash
npm run check    # astro check (TypeScript + Astro)
npm run build    # write static files to dist/
npm run preview  # serve dist/ locally (same /kunpeng-yi-website/ prefix)
```

Override origin or base only if you are not targeting this project Pages preview:

```bash
SITE_URL=https://example.org BASE_PATH=/ npm run build
```

## GitHub Pages

Preview deploy (no custom domain):

1. Keep `site: https://yikunpeng82-sys.github.io` and `base: /kunpeng-yi-website/` in `astro.config.ts` (or set `SITE_URL` / `BASE_PATH` in the workflow).
2. Push to `main` or `cursor/academic-website-cf12`. The workflow runs `npm ci && npm run build` and uploads `dist/`.
3. Set **Settings → Pages → Source** to **GitHub Actions** if it is not already.
4. Open https://yikunpeng82-sys.github.io/kunpeng-yi-website/

To use a user/organization site or a custom domain later, set `BASE_PATH=/` and change `SITE_URL`. That is not this preview.

## Vercel

Do not connect a production project until you intend to go public. Steps only:

1. Import this GitHub repository in Vercel.
2. Framework preset: **Astro**. Build command `npm run build`, output `dist`.
3. Environment variables: `SITE_URL=https://<your-vercel-domain>` (or the custom domain) and `BASE_PATH=/` (Vercel serves from the domain root).
4. Deploy a **Preview** deployment first. Promote to Production only when the domain and assets in `ASSETS_NEEDED.md` are ready.

## Content rules

- Research, teaching, collaboration and conservation only
- Seeded publications are Crossref- or official-list confirmed; citation counts are omitted
- Energy-landscape text describes spatial overlap and planning context, not collision or demographic impact
- Hero figure is a conceptual visualization, not a scientific map
- Missing IDs and the CV PDF are listed in `ASSETS_NEEDED.md`
