/**
 * Öffentliche Adresse der Seite ohne Schrägstrich am Ende.
 * Kommt aus NUXT_PUBLIC_SITE_URL; fehlt sie, wird die aktuelle Anfrage-Adresse genutzt.
 */
export function useSiteOrigin() {
  const { siteUrl } = useRuntimeConfig().public;
  return (siteUrl || useRequestURL().origin).replace(/\/$/, "");
}
