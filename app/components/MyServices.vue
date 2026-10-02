<template>
  <section id="leistungen" class="scroll-mt-24 bg-[#fbf7f2]" aria-label="Meine Leistungen">
    <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
      <h2 v-reveal class="heading-section text-center md:text-left md:whitespace-nowrap">
        Haltet eure Momente fest
      </h2>

      <!-- Karten kommen aus WordPress (Seite „leistungen“), die Anzahl ist frei -->
      <div v-if="services.length" class="mt-6 grid gap-10 sm:gap-6 md:mt-10 lg:gap-8" :class="gridColumns">
        <!-- Zwischen sm und lg als Querkarte (Foto links, Text rechts), sonst Hochkarte -->
        <article
          v-for="(service, index) in services"
          :key="index"
          v-reveal="150"
          class="group flex h-full flex-col rounded-[1.75rem] bg-[#fdfaf6] p-2.5 pb-7 text-center sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:pb-2.5 lg:flex lg:pb-7 ring-1 ring-[#a85c3f]/10 shadow-[0_1px_2px_rgba(143,74,48,0.06),0_8px_16px_-8px_rgba(143,74,48,0.14),0_24px_40px_-24px_rgba(143,74,48,0.2)] transition-[box-shadow,translate] duration-1000 ease-out motion-safe:hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(143,74,48,0.06),0_10px_20px_-8px_rgba(143,74,48,0.16),0_32px_48px_-24px_rgba(143,74,48,0.26)]"
        >
          <!-- Rahmen schneidet den Hover-Zoom ab; Foto füllt ihn absolut aus -->
          <div
            class="photo-hover relative aspect-6/7 w-full rounded-[1.25rem] rounded-b-[2.5rem] ring-1 ring-[#1a1a1f]/10 sm:aspect-auto sm:rounded-[1.25rem] lg:aspect-6/7 lg:rounded-b-[2.5rem]"
          >
            <img
              v-if="service.photo"
              :src="service.photo.src"
              :srcset="service.photo.srcset"
              :sizes="photoSizes"
              :width="service.photo.width"
              :height="service.photo.height"
              :alt="service.photo.alt || `Paket-Foto ${service.title}`"
              class="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </div>

          <div class="flex flex-1 flex-col items-start px-4 text-left sm:px-6 sm:pb-5 lg:px-4 lg:pb-0">
            <h3 class="mt-6 self-center heading-card text-center">
              {{ service.title }}
            </h3>
            <span class="mt-2 h-px w-10 self-center bg-[#a85c3f]/40" aria-hidden="true" />

            <!-- whitespace-pre-line: Zeilenumbrüche aus WordPress bleiben sichtbar -->
            <p v-if="service.description" class="mt-4 whitespace-pre-line text-pretty text-base leading-relaxed text-[#1a1a1f]/95">{{ service.description }}</p>
            <ul v-if="service.includes.length" class="mt-4 space-y-1.5">
              <li v-for="item in service.includes" :key="item.text" class="flex items-center justify-start gap-2.5 text-base text-[#1a1a1f]/95">
                <svg class="h-5 w-5 shrink-0 text-[#a85c3f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <template v-if="item.icon === 'photo'">
                    <rect x="3" y="4" width="18" height="16" rx="2.5" />
                    <circle cx="9" cy="10" r="1.6" />
                    <path d="M21 16l-5-5-8 9" />
                  </template>
                  <template v-else-if="item.icon === 'gallery'">
                    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
                  </template>
                  <template v-else-if="item.icon === 'sun'">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
                  </template>
                  <template v-else-if="item.icon === 'home'">
                    <path d="M3 11l9-7.5 9 7.5" />
                    <path d="M5.5 9.5V20h13V9.5" />
                    <path d="M10 20v-5.5h4V20" />
                  </template>
                  <path v-else d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {{ item.text }}
              </li>
            </ul>

            <p v-if="service.price" class="mt-auto self-center pt-6">
              <span class="inline-block rounded-full bg-[#eadfd2] px-9 py-2.5 text-lg font-medium text-[#5c3a2a] transition-colors duration-1000 ease-out group-hover:bg-[#e3d3c1]">
                {{ service.price }}
              </span>
            </p>
          </div>
        </article>
      </div>

      <div v-else-if="status === 'error'" class="mt-6 text-base leading-relaxed text-[#1a1a1f]/80 md:mt-10">
        <p>Die Leistungen können gerade nicht geladen werden.</p>
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

type Icon = "photo" | "gallery" | "sun" | "home" | "check";

interface Service {
  title: string;
  photo: CmsBild | null;
  description: string;
  includes: { icon: Icon; text: string }[];
  price: string;
}

// Werte aus dem Auswahlfeld in WordPress; Unbekanntes bekommt ein neutrales Häkchen
const icons: Record<string, Icon> = { bild: "photo", galerie: "gallery", sonne: "sun", haus: "home" };

const text = (wert: unknown) => (typeof wert === "string" ? wert.trim() : "");

// Nur die Kartendaten landen im HTML, nicht die ganze API-Antwort (inkl. leistungen_source)
const { data, status, refresh } = useCmsSeite("leistungen", (seite) =>
  alsListe<Record<string, unknown>>(acfFeld(seite, "leistungen"))
    .map(
      (karte): Service => ({
        title: text(karte.titel),
        photo: cmsBild(karte.foto),
        description: text(karte.beschreibung),
        includes: alsListe<Record<string, unknown>>(karte.features)
          .map((feature) => ({ icon: icons[text(feature.icon).toLowerCase()] ?? "check", text: text(feature.text) }))
          .filter((feature) => feature.text),
        // Geschütztes Leerzeichen vor dem Euro-Zeichen, damit „€“ nie allein umbricht
        price: text(karte.preis).replace(/\s+€/, " €"),
      }),
    )
    .filter((service) => service.title),
);

const services = computed(() => data.value ?? []);

// Drei Karten pro Reihe; bei vier (oder acht) Karten lieber 2 × 2 bzw. eine Viererreihe
// auf sehr breiten Bildschirmen statt einer einzelnen Karte in der letzten Reihe.
const fourPerRow = computed(() => services.value.length % 4 === 0);
const gridColumns = computed(() => (fourPerRow.value ? "lg:grid-cols-2 2xl:grid-cols-4" : "lg:grid-cols-3"));
const photoSizes = computed(() =>
  fourPerRow.value
    ? "(min-width: 1536px) 340px, (min-width: 1024px) 50vw, (min-width: 640px) 40vw, 100vw"
    : "(min-width: 1536px) 460px, (min-width: 1024px) 33vw, (min-width: 640px) 40vw, 100vw",
);
</script>
