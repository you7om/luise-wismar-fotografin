export default defineEventHandler((event) => {
  setHeader(event, "content-type", "text/plain; charset=utf-8");
  return `User-agent: *
Disallow:

Sitemap: ${siteOrigin(event)}/sitemap.xml
`;
});
