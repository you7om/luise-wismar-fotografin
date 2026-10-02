// Seiten für Suchmaschinen; design-guide ist intern und fehlt hier bewusst
const pages = ["/", "/impressum", "/datenschutz"];

export default defineEventHandler((event) => {
  const origin = siteOrigin(event);
  setHeader(event, "content-type", "application/xml; charset=utf-8");

  const urls = pages.map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
