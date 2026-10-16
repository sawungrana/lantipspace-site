# SOURCES.md — licenses and provenance

Every image, font, and ornament on this site, with provenance. If something here is wrong,
it's a bug; open an issue.

## Plates (engravings)

All plates are public-domain or CC0 works from museum collections, via Wikimedia Commons.
Downloaded with the Commons API, cropped, and converted to navy duotone by `tools/plates.py`.
Originals live in `assets-src/plates/` (not committed; re-download from the links below).

| Output | Work | Source | License |
|---|---|---|---|
| `batavia-roadstead.webp` | *Gezicht op Batavia*, 1705, RP-P-2018-3197 (ships on the Batavia roadstead) | [Rijksmuseum via Commons](https://commons.wikimedia.org/wiki/File:Gezicht_op_Batavia,_RP-P-2018-3197.jpg) | CC0 |
| `footer-strip.webp` | Sky, skyline, ships and waves from the same roadstead view, cropped for the footer | (same file, cropped) | CC0 |
| `banda-roadstead.webp` | *De reede van Banda* (Banda Neira harbor; series *Gezigten uit Neêrlands Indië*), 1843–45, RP-P-2016-2260-7-1 | [Rijksmuseum via Commons](https://commons.wikimedia.org/wiki/File:Gezicht_vanaf_het_water_op_de_haven_van_Banda_Neira_De_reede_van_Banda._Banda_Neira_(titel_op_object)_Molukschen_Archipel_(serietitel_op_object)_Gezigten_uit_Ne%C3%AArlands_Indi%C3%AB_(serietitel_op_object),_RP-P-2016-2260-7-1.jpg) | CC0 |
| `sumbing.webp` | *Gezicht op de berg Sumbing op Java*, lithograph by C.W. Mieling after Frans Wilhelm Junghuhn, 1853–54 | [Rijksmuseum via Commons](https://commons.wikimedia.org/wiki/File:Gezicht_op_de_berg_Sumbing_op_Java,_Carl_Wilhelm_Mieling_(mogelijk),_naar_Frans_Wilhelm_Junghuhn,_1853_-_1854.jpg) | CC0 |
| `batavia-map.webp` | *Map of Batavia* (city plan), C.A. van Luepken / Johannes Rach, 1761, AMH-5579-NA | [Nationaal Archief via Commons](https://commons.wikimedia.org/wiki/File:AMH-5579-NA_Map_of_Batavia.jpg) | Public domain |
| `batavia-cartouche.webp` | Top ornament (cartouche) of the same map | (same file, cropped) | Public domain |
| `casteel.webp` | *Casteel te Batavia*, Johannes Rach, 1767 | [Commons](https://commons.wikimedia.org/wiki/File:Casteel_te_Batavia_1767.jpg) | Public domain |

No banknote scans are used anywhere on the site — currency reproduction law varies by
jurisdiction and the theme doesn't need them.

## Ornaments (guilloche)

`tools/guilloche.mjs` is an original implementation of standard spirograph mathematics
(hypotrochoids, sine-sum braids). No code from other generators is vendored. The following
open-source projects were consulted as references for what "correct" looks like:

- [id3vi5er/pattern-generator](https://github.com/id3vi5er/pattern-generator) — GPL-2.0 (reference only, no code used)
- [LudGar/guilloche-generator](https://github.com/LudGar/guilloche-generator) — GPL-3.0 (reference only, no code used)
- [prabinpebam/guilloche](https://github.com/prabinpebam/guilloche) — (reference only, no code used)
- [timestretch — Spirograph Guilloché Generator](https://www.timestretch.com/2020/05/10/spirograph_guilloche_generator.html) — blog post, math only

Generated outputs: `src/ornaments/{header-band,rosette,divider}.svg` (inline `?raw` imports, so
they inherit `currentColor`).

## Fonts

| Font | Use | License |
|---|---|---|
| EB Garamond Variable (via `@fontsource-variable/eb-garamond`) | body + display | [OFL-1.1](https://github.com/octaviopardo/EBGaramond12) |
| Fragment Mono (via `@fontsource/fragment-mono`) | mono / endpoints | [OFL-1.1](https://github.com/weiweihuanghuang/fragment-mono) |

## Logo

Favicon derived from the existing `lantipspace` logo assets (parent repo `assets/logo/`).
