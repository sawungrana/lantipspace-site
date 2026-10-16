# lantip.space

Source for [lantip.space](https://lantip.space) — a quiet workshop for maps, models, and
the data under them. Static HTML, no database, no analytics, no cookies.

## Stack

- [Astro](https://astro.build) (static output) + [Tailwind CSS v4](https://tailwindcss.com)
- Fonts self-hosted via Fontsource: EB Garamond Variable, Fragment Mono
- The only JavaScript on the site is the copy button on `/data`

## Commands

| Command            | Action                                                    |
| :----------------- | :-------------------------------------------------------- |
| `npm install`      | Install dependencies                                      |
| `npm run dev`      | Dev server at `localhost:4321` (or `astro dev --background`) |
| `npm run build`    | Build to `./dist/`                                        |
| `npm run preview`  | Preview the build locally                                 |
| `npm run ornaments`| Regenerate guilloche SVGs (`tools/guilloche.mjs` + svgo)  |
| `npm run check`    | Production build (the closest thing to CI here)           |

Plate pipeline: `python3 tools/plates.py` (needs Pillow + numpy; raw scans in
`assets-src/plates/`, not committed — see `SOURCES.md` for provenance).

## Docs

- `PLAN.md` — what the site is, section by section
- `LOG.md` — append-only build log
- `HANDOVER.md` — how to run, deploy, and update this site
- `SOURCES.md` — licenses and provenance for every image, font, and ornament

## Deploy

Cloudflare Pages, static build, output `dist/`. Full steps in `HANDOVER.md`.

## License

Site content and design: © Azzadiva Sawungrana. Plates are public domain / CC0 (see
`SOURCES.md`). Ornament generator (`tools/`) and site code: MIT.
