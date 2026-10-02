<template>
  <section class="relative pt-2 md:pt-4" aria-label="Fotogalerie">
    <!-- data-ready setzt das Inline-Script unten, sobald die Startposition stimmt -->
    <div
      ref="scroller"
      data-hero-track
      class="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto opacity-0 transition-opacity duration-300 ease-out data-ready:opacity-100"
      @touchstart="stopAutoplay"
      @wheel="onWheel"
    >
      <NuxtImg
        v-for="(image, index) in trackImages"
        sizes="88vw sm:72vw lg:54vw xl:46vw"
        quality="80"
        :key="`${image.src}-${index}`"
        :src="image.src"
        :alt="index < images.length ? `Titelfoto ${index + 1}` : ''"
        :aria-hidden="index >= images.length"
        class="aspect-4/3 w-[88%] flex-none snap-center object-cover ring-1 ring-black/5 sm:w-[72%] lg:w-[54%] xl:w-[46%]"
        :loading="index <= 1 ? 'eager' : 'lazy'"
        :fetchpriority="index === 1 ? 'high' : undefined"
      />
    </div>

    <button
      type="button"
      class="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] transition hover:scale-110 md:left-4"
      aria-label="Vorheriges Bild"
      @click="
        stopAutoplay();
        scrollByCard(-1);
      "
    >
      <svg
        class="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <button
      type="button"
      class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] transition hover:scale-110 md:right-4"
      aria-label="Nächstes Bild"
      @click="
        stopAutoplay();
        scrollByCard(1);
      "
    >
      <svg
        class="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
const images = [
  { src: "/hero/hero-1.jpeg" },
  { src: "/hero/hero-2.jpeg" },
  { src: "/hero/hero-3.jpeg" },
  { src: "/hero/hero-4.jpeg" },
];

// Der Track wird verdoppelt, damit der Loop nahtlos wirkt: sobald die
// Kopie erreicht ist, springt scrollLeft unbemerkt an den Anfang zurück.
const trackImages = [...images, ...images];

const scroller = ref<HTMLElement | null>(null);

const GAP_PX = 16;

// Startposition (zweites Foto mittig) schon beim Einlesen des HTML setzen,
// nicht erst nach dem Laden von Vue: so ist das Hero-Bild sofort sichtbar,
// ohne dass es springt. Rechnet wie cardOffset(el, 1).
useHead({
  script: [
    {
      key: "hero-track-start",
      tagPosition: "bodyClose",
      innerHTML: `(function(){var el=document.querySelector("[data-hero-track]");if(!el||el.hasAttribute("data-ready"))return;var img=el.querySelector("img");if(img)el.scrollLeft=img.clientWidth+${GAP_PX};el.setAttribute("data-ready","")})()`,
    },
  ],
  // Ohne JavaScript das Karussell trotzdem zeigen
  noscript: [{ key: "hero-track-noscript", innerHTML: "<style>[data-hero-track]{opacity:1}</style>" }],
});
const AUTOPLAY_MS = 5000;
let autoplayTimer: ReturnType<typeof setInterval> | undefined;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function cardOffset(el: HTMLElement, index: number) {
  const imgs = el.querySelectorAll("img");
  let pos = 0;
  for (let i = 0; i < index; i++) {
    pos += (imgs[i] as HTMLElement).clientWidth + GAP_PX;
  }
  return pos;
}

function scrollByCard(dir: 1 | -1) {
  const el = scroller.value;
  if (!el) return;

  // Wenn wir bereits im angehängten Duplikat stehen, unbemerkt an den
  // Anfang zurückspringen, bevor der nächste Schritt animiert wird.
  const loopPoint = cardOffset(el, images.length);
  if (dir > 0 && loopPoint > 0 && el.scrollLeft >= loopPoint - 1) {
    el.scrollLeft -= loopPoint;
  }

  const cardWidth =
    el.querySelector("img")?.clientWidth ?? el.clientWidth * 0.6;
  el.scrollBy({ left: dir * (cardWidth + GAP_PX), behavior: "smooth" });
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = undefined;
}

// Nur bei überwiegend horizontalem Scroll-Input (z. B. Trackpad-Wischen)
// selbst übernehmen – vertikales Mausrad-Scrollen soll die Seite normal
// weiterscrollen, statt im Karussell gefangen zu sein.
function onWheel(event: WheelEvent) {
  if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

  const el = scroller.value;
  if (!el) return;
  event.preventDefault();
  stopAutoplay();
  el.scrollLeft += event.deltaX;
}

function startAutoplay() {
  if (prefersReducedMotion) return;
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    scrollByCard(1);
  }, AUTOPLAY_MS);
}

onMounted(() => {
  // Normalfall: das Inline-Script hat schon positioniert, dann nichts
  // anfassen (sonst springt es zurück, falls schon gewischt wurde).
  // Nur bei Navigation innerhalb der Seite hier nachholen.
  const el = scroller.value;
  if (el && !el.hasAttribute("data-ready")) {
    el.scrollLeft = cardOffset(el, 1);
    requestAnimationFrame(() => el.setAttribute("data-ready", ""));
  }
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
});
</script>
