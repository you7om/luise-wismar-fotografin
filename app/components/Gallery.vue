<template>
  <section id="portfolio" class="scroll-mt-24 bg-white" aria-label="Galerie">
    <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
      <h2 v-reveal class="heading-section text-center md:text-left lg:whitespace-nowrap">
        Authentische Erinnerungen für die Ewigkeit
      </h2>

      <!--
        Die Fotos kommen aus WordPress (Seite „galerie“) und werden in ihrer Reihenfolge
        Spalte für Spalte verteilt, sodass alle fast gleich hoch sind. Den Rest (wenige Pixel)
        gleichen die Fotos per flex-grow + object-cover aus, damit die Unterkante gerade ist.
        Ausgeblendete Varianten laden dank loading="lazy" keine Bilder.
      -->
      <template v-if="photos.length">
        <div
          v-for="layout in layouts"
          :key="layout.name"
          class="mt-6 md:mt-10"
          :class="layout.class"
        >
          <div
            v-for="(column, index) in layout.columns"
            :key="index"
            class="flex flex-col"
            :class="layout.gap"
          >
            <div
              v-for="photo in column"
              :key="photo.id"
              v-reveal
              :style="{ aspectRatio: `${photo.width} / ${photo.height}` }"
              class="photo-hover relative min-h-0 w-full grow ring-1 ring-[#1a1a1f]/10 [--photo-hover-scale:1.02]"
            >
              <img
                :src="photo.src"
                :srcset="photo.srcset"
                :sizes="layout.sizes"
                :width="photo.width"
                :height="photo.height"
                :alt="photo.alt"
                class="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </template>

      <div v-else-if="status === 'error'" class="mt-6 text-base leading-relaxed text-[#1a1a1f]/80 md:mt-10">
        <p>Die Fotos können gerade nicht geladen werden.</p>
        <button
          type="button"
          class="mt-2 cursor-pointer text-[#a85c3f] underline decoration-transparent underline-offset-4 hover:decoration-[#a85c3f] focus-visible:decoration-[#a85c3f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a85c3f]"
          @click="refresh()"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CmsBild } from "~/composables/useCmsSeite";

// Nur die Bilddaten landen im HTML, nicht die ganze API-Antwort (inkl. fotos_source)
const { data, status, refresh } = useCmsSeite("galerie", (seite) =>
  alsListe(acfFeld(seite, "fotos"))
    .map(cmsBild)
    .filter((bild): bild is CmsBild => bild !== null),
);

const photos = computed(() =>
  (data.value ?? []).map((photo, index) => ({
    ...photo,
    // Neutral benannt, falls in WordPress kein Alternativtext gepflegt ist
    alt: photo.alt || `Portfolio-Foto ${index + 1}`,
  })),
);

/**
 * Teilt die Fotos in `count` Spalten auf, ohne die Reihenfolge aus WordPress zu ändern:
 * Die ersten Fotos kommen von oben nach unten in die linke Spalte, die nächsten in die
 * mittlere usw. Gesucht wird nur, wo jede Spalte beginnt, damit alle fast gleich hoch sind.
 *
 * `gap` ist der Abstand zwischen zwei Fotos im Verhältnis zur Spaltenbreite.
 */
function distribute<T extends { width: number; height: number }>(items: T[], count: number, gap: number) {
  // sum[i] = Höhe der ersten i Fotos (je Foto inkl. eines Abstands), bezogen auf die Spaltenbreite
  const sum = [0];
  items.forEach((item, i) => sum.push(sum[i]! + item.height / item.width + gap));
  const columnHeight = (from: number, to: number) => sum[to]! - sum[from]! - gap;

  const columns = Math.min(count, items.length);
  let bestStarts: number[] = [];
  let bestSpread = Infinity;

  // Alle möglichen Spaltenanfänge durchprobieren (bei ein paar Dutzend Fotos sehr schnell)
  const tryStarts = (starts: number[]) => {
    if (starts.length === columns) {
      const ends = [...starts.slice(1), items.length];
      const heights = starts.map((start, i) => columnHeight(start, ends[i]!));
      const spread = Math.max(...heights) - Math.min(...heights);
      if (spread < bestSpread) {
        bestSpread = spread;
        bestStarts = starts;
      }
      return;
    }
    const last = starts[starts.length - 1]!;
    for (let next = last + 1; next <= items.length - (columns - starts.length); next++) {
      tryStarts([...starts, next]);
    }
  };
  if (columns > 0) tryStarts([0]);

  return bestStarts.map((start, i) => items.slice(start, bestStarts[i + 1] ?? items.length));
}

const layouts = computed(() => [
  {
    // Handy und Tablet: kleiner Abstand auf dem Handy, damit die Fotos groß bleiben
    name: "zwei Spalten",
    class: "grid grid-cols-2 gap-2 sm:gap-4 lg:hidden",
    gap: "gap-2 sm:gap-4",
    sizes: "50vw",
    columns: distribute(photos.value, 2, 0.05),
  },
  {
    name: "drei Spalten",
    class: "hidden grid-cols-3 gap-6 lg:grid",
    gap: "gap-6",
    sizes: "(min-width: 1536px) 460px, 33vw",
    columns: distribute(photos.value, 3, 0.06),
  },
]);
</script>
