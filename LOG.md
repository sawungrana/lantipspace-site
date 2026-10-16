# LOG.md — build log

Append-only. Newest entries at the bottom. One entry per working session or per notable change.

Format: `## YYYY-MM-DD — title`, then bullets: what changed, what broke, what's next.

---

## 2026-10-16 — session 1: plan + scaffold

- Wrote `PLAN.md` (site plan, locked decisions). This log starts here.
- Scaffolded Astro 7.4 + Tailwind v4 in `website-3/` (`npm create astro@latest`, `astro add tailwind`).
- Installed Fontsource: `@fontsource-variable/eb-garamond`, `@fontsource/fragment-mono`.
- Environment confirmed: Node 24.14, npm 11.11, Python 3 + Pillow 11.3, `gh` authed as `sawungrana`.
- Next: design tokens, base layout, ornaments, plates, pages.

## 2026-10-16 — session 2: full build

- `src/styles/global.css`: tokens, paper grain (CSS data-URI), `.stamp-text`, `.rule-line`,
  `.plate-frame`, `.skip-link`, `.ornament`.
- Ornaments: `tools/guilloche.mjs` written from scratch (sine-sum band, hypotrochoid rosette,
  wave divider) → `src/ornaments/*.svg`, svgo'd. Outputs moved from `public/` to `src/` because
  Vite forbids importing from `public/`; they're now `?raw` imports inlining with `currentColor`.
  Sizes after svgo: band 11.2 KB, rosette 15.0 KB, divider 4.3 KB.
- Plates: `tools/plates.py` (numpy duotone, black=40/white=235, gamma=1.15, ink #142c47 on paper
  #f5f0e6). First attempt used PIL `point()` with a 768-entry LUT — misbehaved; numpy path kept.
  Six plates + `og.jpg` generated, all < 300 KB. Sources license-verified via the Commons API.
- Components (`Base`, `Header`, `Footer`, `Mark`, `Plate`, `Stamp`, `Rule`, `CopyField`) and all
  pages written (`/`, `/lantipscript`, `/cartouche`, `/lantev`, `/data`, `/not-doing`, `/colophon`,
  `/404`, `/catalog.json`). `CopyField` is dormant (no `[data-copy]` on any page) → **zero JS in
  the build**, confirmed via `dist/` inspection.
- Release check: `gh api .../lantipscript/releases` shows only **v0.1.0** (dmg + msi, 2026-04-08).
  The README advertises v1.0.0 with Full/Lite/Express builds, but no v1.0.0 GitHub release exists
  yet — so `/lantipscript` links the **releases page** (can't 404) and the swap instructions for
  direct asset URLs are in `HANDOVER.md`. Sizes in the builds table come from the repo README and
  must be re-checked when the release lands.
- Fixed in passing: SOURCES.md had a truncated Commons URL; colophon plate credits corrected with
  real artist/date data; .gitignore excludes `assets-src/`.
- QA: `npm run build` passes (8 pages); sizes: CSS 22.9 KB, no JS, biggest HTML 44 KB (home,
  inlined band + rosette). Visually verified every page via Playwright screenshots (full-page).
  Fixed rosette overlapping the H1 on home (opacity 0.05, shifted).
- Git: initialized, committed, pushed to `sawungrana/lantipspace-site` (branch `master`).
- Next: Cloudflare Pages project + `lantip.space` cutover (steps in `HANDOVER.md`); swap
  `/lantipscript` CTA to direct v1.0.0 assets once that release is published.
