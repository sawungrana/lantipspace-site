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
