#!/usr/bin/env node
/**
 * guilloche.mjs — generates the site's guilloche ornaments.
 *
 * Own implementation of standard spirograph / wave-sum math (no third-party
 * code vendored). Inspired by the open-source generators listed in SOURCES.md:
 * banknote braids are sums of sine waves; rosettes are hypotrochoids.
 *
 * Output: public/ornaments/{header-band,rosette,divider}.svg
 * Usage:  node tools/guilloche.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "src", "ornaments");
mkdirSync(outDir, { recursive: true });

const round = (n, p = 1) => {
  const f = 10 ** p;
  return Math.round(n * f) / f;
};

const pathFromPoints = (points) =>
  points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`)
    .join(" ");

const svg = (viewBox, body, widthAttr = true) => {
  const [w, h] = viewBox.split(" ").slice(2);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" ${widthAttr ? `width="${w}" height="${h}" ` : ""}viewBox="${viewBox}" fill="none" stroke="currentColor">`,
    body,
    `</svg>`,
    "",
  ].join("\n");
};

/* ---------- header band: interlaced sine-sum braid ---------- */

function band() {
  const W = 1600;
  const H = 40;
  const cy = H / 2;
  const amp = 15;
  const components = [
    [0.55, 18, 0.0],
    [0.3, 36, 1.2],
    [0.15, 54, 2.4],
  ];
  const y = (t, phase) =>
    cy +
    amp *
      components.reduce((s, [a, k, p]) => s + a * Math.sin(k * t + p + phase), 0);

  const line = (phase, step = 3) => {
    const pts = [];
    for (let x = 0; x <= W; x += step) {
      const t = (x / W) * 2 * Math.PI;
      pts.push([x, y(t, phase)]);
    }
    return pathFromPoints(pts);
  };

  const body = [
    `  <path d="${line(0)}" stroke-width="0.8"/>`,
    `  <path d="${line(Math.PI)}" stroke-width="0.8"/>`,
    `  <path d="${line(Math.PI / 3)}" stroke-width="0.45" opacity="0.7"/>`,
    `  <path d="${line((2 * Math.PI) / 3)}" stroke-width="0.45" opacity="0.7"/>`,
  ].join("\n");

  return svg(`0 0 ${W} ${H}`, body);
}

/* ---------- rosette: layered hypotrochoids, rose-engine style ---------- */

function hypotrochoidPath({ R, r, d, scale, rotDeg, steps, cx, cy, shrink }) {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const revs = r / gcd(R, r);
  const tMax = 2 * Math.PI * revs;
  const rot = (rotDeg * Math.PI) / 180;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tMax;
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    const xr = x * Math.cos(rot) - y * Math.sin(rot);
    const yr = x * Math.sin(rot) + y * Math.cos(rot);
    pts.push([cx + xr * shrink * scale, cy + yr * shrink * scale]);
  }
  return pathFromPoints(pts);
}

function rosette() {
  const S = 240;
  const c = S / 2;
  const shrink = 0.92;

  const body = [
    // 20-petal flower outline, full size, two rotations
    `  <path d="${hypotrochoidPath({ R: 100, r: 15, d: 24, scale: 1.0, rotDeg: 0, steps: 560, cx: c, cy: c, shrink })}" stroke-width="0.7"/>`,
    `  <path d="${hypotrochoidPath({ R: 100, r: 15, d: 24, scale: 1.0, rotDeg: 3, steps: 560, cx: c, cy: c, shrink })}" stroke-width="0.45" opacity="0.7"/>`,
    // dense 100-petal corona at two inner scales to fill the field
    `  <path d="${hypotrochoidPath({ R: 100, r: 11, d: 20, scale: 0.66, rotDeg: 0, steps: 460, cx: c, cy: c, shrink })}" stroke-width="0.5"/>`,
    `  <path d="${hypotrochoidPath({ R: 100, r: 11, d: 20, scale: 0.4, rotDeg: 2, steps: 400, cx: c, cy: c, shrink })}" stroke-width="0.4" opacity="0.8"/>`,
    // rings
    `  <circle cx="${c}" cy="${c}" r="104" stroke-width="0.9"/>`,
    `  <circle cx="${c}" cy="${c}" r="110" stroke-width="0.4" opacity="0.6"/>`,
  ].join("\n");

  return svg(`0 0 ${S} ${S}`, body);
}

/* ---------- divider: fine linear braid, two mirrored passes ---------- */

function divider() {
  const W = 1200;
  const H = 30;
  const cy = H / 2;
  const wave = (phase, step = 3) => {
    const pts = [];
    for (let x = 0; x <= W; x += step) {
      const t = (x / W) * 2 * Math.PI;
      const y =
        cy +
        6 * Math.sin(16 * t + phase) +
        3 * Math.sin(32 * t + 0.8 + phase) +
        1.5 * Math.sin(48 * t + 1.7 + phase);
      pts.push([x, y]);
    }
    return pathFromPoints(pts);
  };
  const body = [
    `  <path d="${wave(0)}" stroke-width="0.7"/>`,
    `  <path d="${wave(Math.PI)}" stroke-width="0.7"/>`,
  ].join("\n");
  return svg(`0 0 ${W} ${H}`, body);
}

/* ---------- write ---------- */

const files = {
  "header-band.svg": band(),
  "rosette.svg": rosette(),
  "divider.svg": divider(),
};

for (const [name, content] of Object.entries(files)) {
  const file = join(outDir, name);
  writeFileSync(file, content);
  console.log(`${name.padEnd(18)} ${(content.length / 1024).toFixed(1)} KB`);
}
