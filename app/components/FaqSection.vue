<template>
  <section class="border-t border-[#1a1a1f]/10 bg-white" aria-labelledby="faq-heading">
    <div
      class="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-x-12 2xl:max-w-368"
    >
      <!-- Gleiches Raster wie Kontakt und Footer: links 5, rechts 7 Spalten -->
      <div v-reveal class="max-w-xl lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none lg:self-start">
        <h2 id="faq-heading" class="heading-section">
          Häufige Fragen
        </h2>
        <p class="mt-4 text-pretty text-lg leading-relaxed text-[#1a1a1f]/95">
          Vor einem Shooting ist vieles neu, da ist es ganz normal, Fragen zu
          haben. Die häufigsten habe ich hier für euch gesammelt. Eure ist
          nicht dabei? Dann schreibt mir einfach.
        </p>
        <NuxtLink to="/#kontakt" class="btn mt-8">
          Frage stellen
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div v-reveal class="border-t border-[#1a1a1f]/10 lg:col-span-7">
        <details
          v-for="faq in faqs"
          :key="faq.question"
          class="faq-item group border-b border-[#1a1a1f]/10"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a85c3f] [&::-webkit-details-marker]:hidden"
          >
            <span
              class="text-pretty text-base font-medium text-[#1a1a1f] transition-colors duration-500 group-hover:text-[#a85c3f] 2xl:text-lg"
            >
              {{ faq.question }}
            </span>
            <span
              class="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#a85c3f]/30 text-[#a85c3f] transition-colors duration-500 group-hover:border-[#a85c3f] group-open:bg-[#a85c3f] group-open:text-white"
              aria-hidden="true"
            >
              <span class="absolute h-px w-3.5 bg-current" />
              <span
                class="absolute h-3.5 w-px bg-current transition-transform duration-500 group-open:scale-y-0"
              />
            </span>
          </summary>
          <div class="max-w-3xl pb-6 sm:pr-14">
            <p class="text-pretty text-base leading-relaxed text-[#1a1a1f]/80">
              {{ faq.answer }}
            </p>

            <!-- Optionale Tipps mit Icon (z. B. Vorbereitung) -->
            <ul v-if="faq.tips" class="mt-5 space-y-4">
              <li v-for="tip in faq.tips" :key="tip.title" class="flex gap-4">
                <span
                  class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#a85c3f]/10 text-[#a85c3f]"
                  aria-hidden="true"
                >
                  <svg class="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <template v-if="tip.icon === 'pocket'">
                      <path d="M5 4h14v8.5a7 7 0 0 1-14 0V4Z" />
                      <path d="M8 8.5c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" />
                    </template>
                    <template v-else-if="tip.icon === 'glasses'">
                      <circle cx="6.5" cy="14" r="3.5" />
                      <circle cx="17.5" cy="14" r="3.5" />
                      <path d="M10 14c1.2-1 2.8-1 4 0M3 13l1.5-6M21 13l-1.5-6" />
                    </template>
                    <template v-else>
                      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                    </template>
                  </svg>
                </span>
                <span class="text-pretty text-base leading-relaxed text-[#1a1a1f]/80">
                  <span class="font-medium text-[#1a1a1f]">{{ tip.title }}</span>
                  {{ tip.text }}
                </span>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Faq = {
  question: string;
  answer: string;
  tips?: { icon: "pocket" | "glasses" | "heart"; title: string; text: string }[];
};

const faqs: Faq[] = [
  {
    question: "Was sollen wir zum Shooting anziehen?",
    answer:
      "Am schönsten wirken ruhige, aufeinander abgestimmte Farben wie Beige, Creme, Salbei oder sanfte Erdtöne. Große Muster, Logos, Aufdrucke und Neonfarben lieber weglassen, dann bleibt der Blick bei euch. Wichtig ist vor allem, dass ihr euch wohlfühlt. Schickt mir gern vorher ein Foto eurer Outfits, dann schauen wir gemeinsam drauf.",
  },
  {
    question: "Wie bereiten wir uns am besten vor?",
    answer:
      "Eigentlich müsst ihr gar nicht viel tun. Ein paar Kleinigkeiten machen am Ende aber einen spürbaren Unterschied:",
    tips: [
      {
        icon: "pocket",
        title: "Taschen leeren.",
        text: "Handy, Schlüssel und Taschentücher bleiben besser im Auto, das sorgt für eine schöne Silhouette. Haargummis nehmt ihr am besten schon ein paar Stunden vorher vom Handgelenk, damit keine Abdrücke zu sehen sind.",
      },
      {
        icon: "glasses",
        title: "Brille putzen.",
        text: "Saubere Gläser sorgen dafür, dass eure Augen auf den Bildern klar und strahlend wirken.",
      },
      {
        icon: "heart",
        title: "Kleine Helfer für die Kinder.",
        text: "Ein Lieblingskuscheltier oder ein kleiner Snack wirken manchmal Wunder, wenn die Laune zwischendurch kippt.",
      },
    ],
  },
  {
    question: "Was ist, wenn unser Kind an dem Tag keine Lust hat?",
    answer:
      "Das ist völlig normal und überhaupt kein Problem. Ich plane genug Zeit ein, wir machen Pausen, spielen und lassen die Kinder einfach Kinder sein. Die schönsten Bilder entstehen oft genau dann, wenn niemand mehr an die Kamera denkt.",
  },
  {
    question: "Was passiert, wenn wir absagen müssen?",
    answer:
      "Das Leben mit Kindern ist nicht immer planbar. Wenn jemand krank wird oder etwas dazwischenkommt, meldet euch bitte so früh wie möglich. Dann suchen wir ganz unkompliziert einen neuen Termin.",
  },
  {
    question: "Und wenn das Wetter nicht mitspielt?",
    answer:
      "Ein bewölkter Himmel ist für Fotos sogar ideal, weil das Licht dann weich ist. Bei Dauerregen oder Sturm verschieben wir das Shooting einfach. Ich melde mich rechtzeitig bei euch, damit wir gemeinsam entscheiden können.",
  },
  {
    question: "Wann ist der beste Zeitpunkt für Babybauch- und Neugeborenen-Fotos?",
    answer:
      "Für Babybauch-Bilder eignet sich die 30. bis 36. Schwangerschaftswoche, dann ist der Bauch schön rund und ihr seid meist noch gut beweglich. Neugeborene fotografiere ich am liebsten in den ersten Lebenswochen. Fragt am besten schon während der Schwangerschaft an, dann halte ich euch einen Zeitraum frei.",
  },
  {
    question: "Wo findet das Shooting statt?",
    answer:
      "In Wismar und Umgebung, am Strand, im Wald, auf einer Wiese oder ganz entspannt bei euch zuhause. Habt ihr einen Lieblingsort, der euch etwas bedeutet? Dann fotografiere ich euch gern dort.",
  },
  {
    question: "Wann und wie bekommen wir unsere Bilder?",
    answer:
      "Nach dem Shooting suche ich die schönsten Bilder aus und bearbeite sie liebevoll von Hand. Innerhalb von etwa zwei bis drei Wochen bekommt ihr sie in einer eigenen Online-Galerie, aus der ihr sie ganz einfach herunterladen könnt.",
  },
];
</script>

<style scoped>
/* Sanftes Auf- und Zuklappen (moderne Browser, sonst ohne Animation) */
.faq-item {
  interpolate-size: allow-keywords;
}

.faq-item::details-content {
  block-size: 0;
  overflow: hidden;
  transition:
    block-size 0.5s cubic-bezier(0.22, 0.61, 0.36, 1),
    content-visibility 0.5s allow-discrete;
}

.faq-item[open]::details-content {
  block-size: auto;
}

@media (prefers-reduced-motion: reduce) {
  .faq-item::details-content {
    transition: none;
  }
}
</style>
