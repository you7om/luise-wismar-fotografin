import type { CmsBild, CmsSeite } from "./useCmsSeite";

export type LeistungIcon = "photo" | "gallery" | "sun" | "home" | "check";

export interface Leistung {
  title: string;
  photo: CmsBild | null;
  description: string;
  includes: { icon: LeistungIcon; text: string }[];
  price: string;
}

// Werte aus dem Auswahlfeld in WordPress; Unbekanntes bekommt ein neutrales Häkchen
const icons: Record<string, LeistungIcon> = { bild: "photo", galerie: "gallery", sonne: "sun", haus: "home" };

const text = (wert: unknown) => (typeof wert === "string" ? wert.trim() : "");

// Nur die Kartendaten landen im HTML, nicht die ganze API-Antwort (inkl. leistungen_source)
function leistungenAusSeite(seite: CmsSeite): Leistung[] {
  return alsListe<Record<string, unknown>>(acfFeld(seite, "leistungen"))
    .map((karte) => ({
      title: text(karte.titel),
      photo: cmsBild(karte.foto),
      description: text(karte.beschreibung),
      includes: alsListe<Record<string, unknown>>(karte.features)
        .map((feature) => ({ icon: icons[text(feature.icon).toLowerCase()] ?? "check", text: text(feature.text) }))
        .filter((feature) => feature.text),
      // Geschütztes Leerzeichen vor dem Euro-Zeichen, damit „€“ nie allein umbricht
      price: text(karte.preis).replace(/\s+€/, " €"),
    }))
    .filter((leistung) => leistung.title);
}

/**
 * Leistungskarten aus der WordPress-Seite „leistungen“. Mehrere Komponenten können das
 * gleichzeitig nutzen, die Daten werden nur einmal geladen und geteilt.
 */
export function useLeistungen() {
  return useCmsSeite("leistungen", leistungenAusSeite);
}

/**
 * Preisspanne für Google (z. B. „50–70 €“), berechnet aus den Preisen der Karten.
 * Liest jeweils die erste Zahl („ab 50 €“ → 50, „49,90 €“ → 49,90).
 * Gibt undefined zurück, wenn kein Preis eine Zahl enthält.
 */
export function preisspanne(leistungen: Leistung[]): string | undefined {
  const preise = leistungen
    .map((leistung) => leistung.price.match(/\d+(?:[.,]\d+)?/)?.[0])
    .filter((preis): preis is string => !!preis)
    .map((preis) => ({ text: preis, wert: Number(preis.replace(",", ".")) }))
    .sort((a, b) => a.wert - b.wert);

  if (!preise.length) return undefined;
  const min = preise[0]!;
  const max = preise[preise.length - 1]!;
  return min.wert === max.wert ? `${min.text} €` : `${min.text}–${max.text} €`;
}
