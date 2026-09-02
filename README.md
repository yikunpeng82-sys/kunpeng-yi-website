# Kunpeng Yi / 易昆鹏

Statically generated academic website for Associate Professor Kunpeng Yi (易昆鹏; institutional pages also list 伊坤朋), Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences / 中国科学院生态环境研究中心.

This repository is the site. It is not published from this pull request.

## Stack

- Astro 5 + TypeScript
- Fully static output (`astro build`)
- English at `/`, Chinese at `/zh/`
- Publications at `/publications/` and `/zh/publications/`
- One publication seed file: `src/data/publications.ts` (no live Scholar scrape)

## Local run

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open `http://localhost:4321/`.

Useful commands:

```bash
npm run check    # astro check (TypeScript + Astro)
npm run build    # write static files to dist/
npm run preview  # serve dist/ locally
```

Set a public origin if you need absolute canonical and sitemap URLs while building locally:

```bash
SITE_URL=https://example.org npm run build
```

For a project-page path prefix (see GitHub Pages below):

```bash
SITE_URL=https://yikunpeng82-sys.github.io BASE_PATH=/kunpeng-yi-website/ npm run build
```

## GitHub Pages

Do not enable Pages until you intend to go public. Steps only:

1. In `astro.config.ts` (or the build environment) set:
   - `SITE_URL=https://<user>.github.io`
   - `BASE_PATH=/kunpeng-yi-website/` for a project site, or `BASE_PATH=/` for a user/organization site or custom domain
2. Build: `SITE_URL=… BASE_PATH=… npm run build`
3. Publish the `dist/` folder with GitHub Pages (Actions upload-pages-artifact, or a `gh-pages` branch). If using Actions, add a workflow that runs `npm ci && npm run build` and deploys `dist/`.
4. Under repository **Settings → Pages**, choose the GitHub Actions source (or the branch that holds `dist/`).
5. Confirm the site serves from the prefix you set (`/kunpeng-yi-website/` vs `/`). Internal links already go through `import.meta.env.BASE_URL`.

Custom domain: point DNS at GitHub Pages, add the domain in the Pages settings, and set `SITE_URL=https://your.domain` with `BASE_PATH=/`.

## Vercel

Do not connect a production project until you intend to go public. Steps only:

1. Import this GitHub repository in Vercel.
2. Framework preset: **Astro**. Build command `npm run build`, output `dist`.
3. Environment variables: `SITE_URL=https://<your-vercel-domain>` (or the custom domain). Leave `BASE_PATH` unset (defaults to `/`).
4. Deploy a **Preview** deployment first. Promote to Production only when the domain and assets in `ASSETS_NEEDED.md` are ready.

## Content rules

- Research, teaching, collaboration and conservation only
- Seeded publications are Crossref- or official-list confirmed; citation counts are omitted
- Energy-landscape text describes spatial overlap and planning context, not collision or demographic impact
- Hero figure is a conceptual visualization, not a scientific map
- Missing IDs and the CV PDF are listed in `ASSETS_NEEDED.md`
