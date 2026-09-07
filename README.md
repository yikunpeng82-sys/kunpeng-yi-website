# Kunpeng Yi / 伊坤朋

Academic website for Associate Researcher Kunpeng Yi (伊坤朋), Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences / 中国科学院生态环境研究中心.

English title: **Associate Researcher** (optional form: Associate Researcher / Associate Professor). Chinese title: **副研究员**.

Laboratory: **State Key Laboratory of Regional and Urban Ecology (SKLRUE)** / 区域与城市生态安全全国重点实验室, formerly State Key Laboratory of Urban and Regional Ecology.

## GitHub Pages

**https://yikunpeng82-sys.github.io/kunpeng-yi-website/**

Chinese home: https://yikunpeng82-sys.github.io/kunpeng-yi-website/zh/  
Selected publications: https://yikunpeng82-sys.github.io/kunpeng-yi-website/publications/  
Projects: https://yikunpeng82-sys.github.io/kunpeng-yi-website/projects/

Astro `site` is `https://yikunpeng82-sys.github.io` and **`base` must be `/kunpeng-yi-website/`**. The workflow in `.github/workflows/pages.yml` runs `npm ci && npm run check && npm run build` and deploys `dist/` from `main`.

**Settings → Pages → Source: GitHub Actions.**

## Local preview

Requires Node.js 22+.

```bash
npm ci
npm run dev
```

Open `http://localhost:4321/kunpeng-yi-website/`.

```bash
npm ci
npm run check
npm run build
npm run preview
```

## Documents

Rebuild Academic CV and Academic Bio PDFs:

```bash
python3 scripts/build-cv-documents.py
```

Requires `reportlab` and `python-docx`. CJK text uses WenQuanYi Micro Hei.
