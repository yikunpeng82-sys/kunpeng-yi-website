# Assets needed

Confirmed public records used for this site come from Crossref, the RCEES faculty page, the laboratory profile, UCAS, and Google Scholar. The following items are **not** invented and should be supplied before any production launch.

## Identity and documents

- [x] Official bilingual CV — `public/cv/kunpeng-yi-cv-en.pdf` and `public/cv/kunpeng-yi-cv-zh.pdf` (optional `.docx` alongside). Reconstructed from the author-supplied documents; website UI omits gender, place of birth, private phone and home address.
- [x] Preferred public portrait (rights-cleared; no publisher or third-party hotlinks) — `public/images/kunpeng-yi-portrait.jpg`
- [ ] Written confirmation of the public Chinese name to use on letterhead: **易昆鹏** (this site) versus **伊坤朋** (CAS / UCAS / laboratory pages)

## Persistent researcher IDs

Placeholders only — do not guess.

- [ ] ORCID iD and `https://orcid.org/…` URL
- [x] ResearchGate profile URL — https://www.researchgate.net/profile/Kunpeng-Yi (from the public RCEES faculty page)
- [ ] GitHub profile URL (if a public research/code identity exists)
- [ ] Optional: Scopus Author ID, Web of Science ResearcherID, ResearchMap

When remaining IDs are confirmed, add them to `src/data/site.ts` (`SOCIAL_PLACEHOLDERS`) and to Person JSON-LD `sameAs`. ResearchGate is already live.

## Optional visual assets

- [ ] Laboratory or RCEES mark, if branding permission is granted
- [ ] Rights-cleared field photographs of study systems (Miyun, Baiyangdian, Poyang, tracking fieldwork). Do **not** hotlink publisher figures
- [ ] Higher-resolution crane silhouette only if it remains clearly **conceptual** and is not presented as a scientific map
- [x] Open Graph share image (`1200×630`) — official crop at `public/images/og-kunpeng-yi.jpg` (conceptual SVG retained at `public/og/share.svg`)

## Publications maintenance

- [ ] Author-accepted manuscripts or publisher PDFs **only** where the licence allows local hosting
- [ ] Any additional Kunpeng Yi papers to append to the single seed file `src/data/publications.ts` after Crossref (or equivalent) verification
- [ ] DOIs for the two *Wildfowl* (2020) entries if they are later registered
- [ ] If citation counts are ever shown, they must be entered by hand from a dated source — this site does not scrape Google Scholar

## Out of scope on purpose

Do not add banking, insurance, wealth-management, Animal-IoT marketing, family information, CCP membership, gender, birthplace, private phone numbers, or a home address. The office telephone and institutional postal address on the public RCEES faculty page may appear on Contact.
