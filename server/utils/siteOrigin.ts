import type { H3Event } from "h3";

/** Öffentliche Adresse der Seite ohne Schrägstrich am Ende (siehe NUXT_PUBLIC_SITE_URL). */
export function siteOrigin(event: H3Event) {
  const { siteUrl } = useRuntimeConfig(event).public;
  return (siteUrl || getRequestURL(event).origin).replace(/\/$/, "");
}
