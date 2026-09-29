<template>
  <section id="portfolio" class="scroll-mt-24 bg-white" aria-label="Galerie">
    <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
      <h2 v-reveal class="heading-section text-center md:text-left lg:whitespace-nowrap">
        Authentische Erinnerungen für die Ewigkeit
      </h2>

      <!--
        Feste Spaltenaufteilung je Breite, rechnerisch so gewählt, dass alle
        Spalten fast gleich hoch sind. Den Rest (wenige Pixel) gleichen die
        Fotos per flex-grow + object-cover aus, damit die Unterkante gerade ist.
        Ausgeblendete Varianten laden dank loading="lazy" keine Bilder.
      -->
      <div
        v-for="layout in layouts"
        :key="layout.name"
        class="mt-10"
        :class="layout.class"
      >
        <div
          v-for="(column, index) in layout.columns"
          :key="index"
          class="flex flex-col"
          :class="layout.gap"
        >
          <div
            v-for="file in column"
            :key="file"
            v-reveal
            :style="{ aspectRatio: `${photos[file]!.width} / ${photos[file]!.height}` }"
            class="photo-hover relative min-h-0 w-full grow ring-1 ring-[#1a1a1f]/10 [--photo-hover-scale:1.02]"
          >
            <NuxtImg
              :src="`/Galerie/${file}`"
              :alt="photos[file]!.alt"
              :sizes="layout.sizes"
              class="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Photo = { width: number; height: number; alt: string };

const photos: Record<string, Photo> = {
  "IMG_8742.jpeg": {
    width: 12077,
    height: 8035,
    alt: "Eltern hocken auf einer Wiese und strecken ihrem Kleinkind die Hände entgegen",
  },
  "DSC_2465.jpeg": {
    width: 2949,
    height: 3829,
    alt: "Hände formen ein Herz auf einem Babybauch im grünen Kleid",
  },
  "IMG_1105.jpeg": {
    width: 1206,
    height: 1035,
    alt: "Babyhand umfasst den Finger eines Elternteils",
  },
  "IMG_5419.jpeg": {
    width: 3013,
    height: 4524,
    alt: "Kleinkind mit Mütze läuft durch buntes Herbstlaub in einer Allee",
  },
  "cb1b6a31-e7b0-4364-9163-31b778b20bb8.jpeg": {
    width: 1600,
    height: 1064,
    alt: "Familie steht Hand in Hand am Strand und blickt auf die Ostsee",
  },
  "IMG_9292.jpeg": {
    width: 4024,
    height: 6048,
    alt: "Kleines Mädchen im rosa Kleid mit Sonnenhut steht auf einem Feldweg",
  },
  "IMG_8738.jpeg": {
    width: 11599,
    height: 7717,
    alt: "Kleinkind mit Zopf blickt zu seinen Eltern, die auf einer Bank sitzen",
  },
  "Familien-Packet.jpeg": {
    width: 8048,
    height: 12096,
    alt: "Eltern küssen sich am Seeufer und halten ihr Kleinkind an den Händen",
  },
  "IMG_1104.jpeg": {
    width: 1206,
    height: 770,
    alt: "Kleine Babyfüße auf einer weichen, hellen Decke",
  },
  "IMG_5415.jpeg": {
    width: 2915,
    height: 4482,
    alt: "Kleinkind mit Mütze schaut lachend hinter einem Baumstamm hervor",
  },
  "IMG_9637.jpeg": {
    width: 1206,
    height: 891,
    alt: "Mutter breitet auf einer Wiese die Arme aus, ihre Tochter läuft auf sie zu",
  },
  "Neugeborenen-Packet.jpeg": {
    width: 907,
    height: 718,
    alt: "Schlafendes Neugeborenes im hellen Body auf einer weißen Decke",
  },
  "IMG_8741.jpeg": {
    width: 9210,
    height: 7340,
    alt: "Kleinkind läuft über eine Wiese, im Hintergrund umarmen sich die Eltern",
  },
};

const layouts = [
  {
    // Handy und Tablet: kleiner Abstand auf dem Handy, damit die Fotos groß bleiben
    name: "zwei Spalten",
    class: "grid grid-cols-2 gap-2 sm:gap-4 lg:hidden",
    gap: "gap-2 sm:gap-4",
    // Wichtig: mit Breakpoint angeben, ein einzelnes "50vw" versteht @nuxt/image falsch
    sizes: "50vw sm:50vw",
    columns: [
      [
        "IMG_8742.jpeg",
        "DSC_2465.jpeg",
        "IMG_1105.jpeg",
        "Familien-Packet.jpeg",
        "Neugeborenen-Packet.jpeg",
        "IMG_5419.jpeg",
      ],
      [
        "IMG_9292.jpeg",
        "cb1b6a31-e7b0-4364-9163-31b778b20bb8.jpeg",
        "IMG_5415.jpeg",
        "IMG_1104.jpeg",
        "IMG_8738.jpeg",
        "IMG_9637.jpeg",
        "IMG_8741.jpeg",
      ],
    ],
  },
  {
    name: "drei Spalten",
    class: "hidden grid-cols-3 gap-6 lg:grid",
    gap: "gap-6",
    sizes: "33vw 2xl:460px",
    columns: [
      [
        "IMG_8742.jpeg",
        "IMG_5419.jpeg",
        "IMG_1105.jpeg",
        "IMG_8738.jpeg",
        "cb1b6a31-e7b0-4364-9163-31b778b20bb8.jpeg",
      ],
      [
        "DSC_2465.jpeg",
        "Neugeborenen-Packet.jpeg",
        "IMG_9292.jpeg",
        "IMG_8741.jpeg",
      ],
      [
        "IMG_9637.jpeg",
        "Familien-Packet.jpeg",
        "IMG_1104.jpeg",
        "IMG_5415.jpeg",
      ],
    ],
  },
];
</script>
