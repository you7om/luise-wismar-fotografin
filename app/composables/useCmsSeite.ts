export interface CmsSeite {
  title: { rendered: string };
  content: { rendered: string };
  // Felder von SCF/ACF. Ohne Feldgruppe liefert WordPress ein leeres Array statt eines Objekts.
  acf?: Record<string, unknown> | unknown[];
}

/** Bild-Objekt von SCF/ACF bei acf_format=standard (nur die Teile, die wir nutzen) */
interface CmsBildRoh {
  id: number;
  alt?: string;
  url: string;
  width: number;
  height: number;
  sizes?: Record<string, string | number | undefined>;
}

export interface CmsBild {
  id: number;
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * WordPress liefert für leere Galerie- oder Wiederholungsfelder `false` statt `[]`.
 * Gibt deshalb immer ein Array zurück.
 */
export function alsListe<T>(wert: unknown): T[] {
  return Array.isArray(wert) ? (wert as T[]) : [];
}

/** Liest ein einzelnes Feld aus `acf`, egal ob WordPress ein Objekt oder ein leeres Array schickt */
export function acfFeld(seite: CmsSeite, name: string): unknown {
  const acf = seite.acf;
  return acf && !Array.isArray(acf) ? acf[name] : undefined;
}

// Von WordPress erzeugte Zwischengrößen für srcset (die kleinen Vorschaubilder lohnen sich nicht)
const SRCSET_GROESSEN = ["medium_large", "large", "1536x1536", "2048x2048"];

/**
 * Wandelt ein SCF-Bild in die Daten für ein <img> um. `sizes.large` ist die Hauptquelle,
 * Breite/Höhe passen dazu, damit der Browser den Platz vorab reserviert und nichts springt.
 * Gibt null zurück, wenn das Feld leer oder unbrauchbar ist.
 */
export function cmsBild(wert: unknown): CmsBild | null {
  if (!wert || typeof wert !== "object") return null;
  const bild = wert as CmsBildRoh;
  if (!bild.url) return null;

  const sizes = bild.sizes ?? {};
  const groesse = (name: string) => {
    const src = sizes[name];
    const width = Number(sizes[`${name}-width`]);
    const height = Number(sizes[`${name}-height`]);
    return typeof src === "string" && width > 0 && height > 0 ? { src, width, height } : null;
  };

  // Kleine Originale haben keine large-Größe, dann das Original nehmen
  const haupt = groesse("large") ?? { src: bild.url, width: bild.width, height: bild.height };

  // Kleine Bilder bekommen von WordPress dieselbe Datei für mehrere Größen, doppelte Breiten raus
  const kandidaten = new Map<number, string>();
  for (const name of SRCSET_GROESSEN) {
    const g = groesse(name);
    if (g && !kandidaten.has(g.width)) kandidaten.set(g.width, g.src);
  }
  if (!kandidaten.has(haupt.width)) kandidaten.set(haupt.width, haupt.src);
  const srcset = [...kandidaten].map(([breite, src]) => `${src} ${breite}w`).join(", ");

  return { id: bild.id, ...haupt, srcset, alt: (bild.alt ?? "").trim() };
}

/**
 * Lädt eine Seite per Slug aus dem Headless WordPress (runtimeConfig.public.cmsUrl).
 * Beim `nuxt generate` wird der Inhalt ins statische HTML eingebaut. Im Browser wird
 * danach einmal still die aktuelle Version nachgeladen, damit Änderungen in WordPress
 * ohne neuen Build sichtbar werden. Schlägt das fehl, bleibt der Inhalt vom Build stehen.
 *
 * Mit `umwandeln` lassen sich die Rohdaten auf das Nötige verkleinern (z. B. nur die
 * Bilder einer Galerie). Nur das Ergebnis landet im HTML, nicht die ganze API-Antwort.
 */
export function useCmsSeite<T = CmsSeite>(
  slug: string,
  umwandeln: (seite: CmsSeite) => T = (seite) => seite as T,
) {
  const { cmsUrl } = useRuntimeConfig().public;
  const anfrage = {
    baseURL: cmsUrl,
    // acf_format=standard: Bilder kommen als Objekt mit alt und sizes statt nur als ID
    query: { slug, _fields: "title,content,acf", acf_format: "standard" },
  };
  const ersteSeite = (items: CmsSeite[]) => (items[0] ? umwandeln(items[0]) : null);

  const seite = useFetch("/wp-json/wp/v2/pages", {
    ...anfrage,
    key: `cms-seite-${slug}`,
    transform: ersteSeite,
  });

  // Bewusst $fetch statt refresh(): ändert weder status noch error,
  // die Seite flackert also nicht und ein Fehler löscht den vorhandenen Inhalt nicht.
  onMounted(async () => {
    try {
      const aktuell = ersteSeite(await $fetch<CmsSeite[]>("/wp-json/wp/v2/pages", anfrage));
      if (aktuell) {
        // Gleiche Umwandlung wie oben; Nuxts generische Typen erkennen das nicht von selbst
        seite.data.value = aktuell as typeof seite.data.value;
        seite.error.value = undefined;
      }
    } catch {
      // Inhalt vom Build bleibt stehen
    }
  });

  return seite;
}
