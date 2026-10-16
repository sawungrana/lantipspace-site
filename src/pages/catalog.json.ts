import type { APIRoute } from "astro";

const REPO = "https://github.com/sawungrana/lantipscript";

const catalog = {
  catalog_version: 1,
  as_of: "2026-10-16",
  note: "Only artifacts that exist right now are listed. No promises.",
  tools: [
    {
      id: "lantipscript",
      version: "1.0.0",
      page: "https://lantip.space/lantipscript",
      source: REPO,
      downloads: {
        releases: `${REPO}/releases`,
        full: {
          macos_apple_silicon: `${REPO}/releases/download/v1.0.0/lantipscript_full_mac_1.0.0_aarch64.dmg`,
          windows_x64: `${REPO}/releases/download/v1.0.0/lantipscript_full_windows_1.0.0_x64.exe`,
        },
        lite: {
          macos_apple_silicon: `${REPO}/releases/download/v1.0.0/lantipscript_lite_mac_1.0.0_aarch64.dmg`,
          windows_x64: `${REPO}/releases/download/v1.0.0/lantipscript_lite_windows_1.0.0_x64.exe`,
        },
        express: {
          macos_apple_silicon: `${REPO}/releases/download/v1.0.0/lantipscript_express_mac_1.0.0_aarch64.dmg`,
          windows_x64: `${REPO}/releases/download/v1.0.0/lantipscript_express_windows_1.0.0_x64.exe`,
        },
      },
    },
  ],
  models: [],
  datasets: [],
  site: {
    url: "https://lantip.space",
    source: "https://github.com/sawungrana/lantipspace-site",
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(catalog, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
