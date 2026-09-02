# Assets needed

Confirmed public records used for this site come from Crossref, the RCEES faculty page, the laboratory profile, UCAS, and Google Scholar. The following items are **not** invented and should be supplied before any production launch.

## Identity and documents

- [ ] Official bilingual CV PDF to replace `public/cv/kunpeng-yi-cv-placeholder.pdf` and the `/cv/` placeholder page
- [ ] Preferred public portrait (rights-cleared; no publisher or third-party hotlinks)
- [ ] Written confirmation of the public Chinese name to use on letterhead: **易昆鹏** (this site) versus **伊坤朋** (CAS / UCAS / laboratory pages)

## Persistent researcher IDs

Placeholders only — do not guess.

- [ ] ORCID iD and `https://orcid.org/…` URL
- [ ] ResearchGate profile URL
- [ ] GitHub profile URL (if a public research/code identity exists)
- [ ] Optional: Scopus Author ID, Web of Science ResearcherID, ResearchMap

When IDs are confirmed, add them to `src/data/site.ts` (`SOCIAL_PLACEHOLDERS`) and to Person JSON-LD `sameAs`.

## Optional visual assets

- [ ] Laboratory or RCEES mark, if branding permission is granted
- [ ] Rights-cleared field photographs of study systems (Miyun, Baiyangdian, Poyang, tracking fieldwork). Do **not** hotlink publisher figures
- [ ] Higher-resolution crane silhouette only if it remains clearly **conceptual** and is not presented as a scientific map
- [ ] Open Graph share image (`1200×630`) once a portrait or conceptual still is approved

## Publications maintenance

- [ ] Author-accepted manuscripts or publisher PDFs **only** where the licence allows local hosting
- [ ] Any additional Kunpeng Yi papers to append to the single seed file `src/data/publications.ts` after Crossref (or equivalent) verification
- [ ] DOIs for the two *Wildfowl* (2020) entries if they are later registered
- [ ] If citation counts are ever shown, they must be entered by hand from a dated source — this site does not scrape Google Scholar

## Out of scope on purpose

Do not add banking, insurance, wealth-management, Animal-IoT marketing, family information, private phone numbers, or a home address.
