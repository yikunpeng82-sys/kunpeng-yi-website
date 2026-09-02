# Kunpeng Yi / 易昆鹏

Statically generated academic website for Associate Professor Kunpeng Yi (易昆鹏; institutional pages also list 伊坤朋), Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences / 中国科学院生态环境研究中心.

## GitHub Pages

Live project Pages URL (not a custom domain):

**https://yikunpeng82-sys.github.io/kunpeng-yi-website/**

Chinese home: https://yikunpeng82-sys.github.io/kunpeng-yi-website/zh/  
Publications: https://yikunpeng82-sys.github.io/kunpeng-yi-website/publications/

Astro `site` is `https://yikunpeng82-sys.github.io` and **`base` must be `/kunpeng-yi-website/`** so assets and EN / ZH / publications routes resolve on this project site. The workflow in `.github/workflows/pages.yml` runs `npm ci && npm run build` and deploys `dist/`.

**Settings → Pages → Source: GitHub Actions.**

## Local preview

Requires Node.js 22+. Because `base` is `/kunpeng-yi-website/`, the app is not at the server root.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321/kunpeng-yi-website/`.

```bash
npm run check
npm run build
npm run preview
```

Preview is also at `http://localhost:4321/kunpeng-yi-website/`.

## Add a paper

Edit the single seed file `src/data/publications.ts`. Append one object to `publications` only after Kunpeng Yi is a named author and the record is Crossref- or official-list confirmed.

Required fields:

- `id` — stable slug
- `year`, `title`, `authors`, `journal`
- `doi` if Crossref-verified (omit rather than guess)
- `filters` — one or more of `movement` | `remote-sensing` | `wetlands` | `energy` | `disturbance`
- `summary.en` and `summary.zh` — short, neutral, no citation counts

Optional: `volume`, `issue`, `pages`, `note` (for unverified DOI), `selected` (home selected-work card), `home` (home preview, max six).

Do not scrape Google Scholar. Do not invent papers or citation counts.

## Content rules

- Research, teaching, collaboration and conservation only
- Energy-landscape text describes spatial overlap and planning context, not collision or demographic impact
- Hero figure is a conceptual visualization, not a scientific map
- Official portrait and CV PDFs are self-hosted; ORCID, ResearchGate and GitHub remain placeholders in `ASSETS_NEEDED.md`
- Rebuild CV files with `python3 scripts/build-cv-documents.py` after `pip install reportlab python-docx`
