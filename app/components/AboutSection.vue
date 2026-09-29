<template>
  <section id="ueber-mich" class="relative scroll-mt-24 overflow-hidden bg-white" aria-label="Über Luise">
    <!-- Dekoration: großer, sehr heller Name im Hintergrund, ragt links aus dem Bild -->
    <p
      class="pointer-events-none absolute top-2 -left-6 select-none lg:-top-4
      font-display text-[clamp(8rem,4rem+14vw,20rem)]
      font-normal uppercase leading-none tracking-[0.04em] text-[#f3ebe1]/30"
      aria-hidden="true"
    >
      Luise
    </p>

    <div
      class="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-16 md:px-8 md:py-24
       lg:grid-cols-12 lg:items-center lg:gap-8 2xl:max-w-368"
    >
      <div v-reveal class="@container max-w-2xl lg:col-span-7 lg:max-w-none">
        <h2 class="text-balance leading-[1.1] text-[#4a2e22]">
          <!-- Gleiche Größe wie alle Abschnittsüberschriften -->
          <span class="heading-section block">
            Hey, ich bin Luise,
          </span>
          <!-- Größe folgt der Spaltenbreite (cqi), damit die Zeile möglichst einzeilig bleibt -->
          <span class="mt-2 block font-script text-[clamp(1.7rem,8.6cqi,3.75rem)] font-normal">
            deine Fotografin aus Wismar.
          </span>
        </h2>

        <!-- Alle Absätze gleich groß, gleicher Abstand dazwischen -->
        <div class="mt-4 max-w-2xl space-y-4 text-pretty text-lg leading-relaxed
         text-[#1a1a1f]/90 2xl:text-xl">
          <p>
            Mama von drei Kindern. Meine Kamera begleitet mich, seit ich zehn
            bin. Dass aus dem kleinen Hobby einmal so ein wichtiger Teil meines
            Lebens wird, hätte ich damals nicht gedacht.
          </p>
          <p>
            Als dreifache Mama weiß ich, wie schnell die Zeit vergeht. Aus
            kleinen Händen werden große, und aus einem „Das mache ich später“
            wird irgendwann ein „Weißt du noch?“.
          </p>
          <p>
            Deshalb halte ich am liebsten die echten Momente fest: ein
            herzliches Lachen, eine innige Umarmung, kleine Kinderhände, Chaos
            und Nähe. Ich möchte Erinnerungen schaffen, die euch später zeigen,
            wie sich diese Zeit angefühlt hat.
          </p>
          <p>Schön, dass du hier bist.</p>
        </div>

        <NuxtLink to="/#kontakt" class="btn mt-8 max-sm:px-4.5 max-sm:tracking-normal">
          Lass uns eure Geschichte erzählen
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>

      <figure v-reveal class="order-first w-full max-w-sm justify-self-center lg:order-0 sm:max-w-md lg:col-span-5 lg:col-start-8 lg:mt-16 lg:max-w-none">
        <div class="relative aspect-square">
          <!-- Versetzte feine Kreislinie hinter dem Foto -->
          <span
            class="absolute inset-0 translate-x-4 translate-y-4 rounded-full border border-[#e3d3c1]"
            aria-hidden="true"
          />
          <NuxtImg
            src="/about_photo.jpeg"
            sizes="384px sm:448px lg:620px"
            alt="Luise Riegel mit Kamera in der Hand, lächelnd im Freien"
            class="relative h-full w-full rounded-full object-cover 
            object-[50%_30%] ring-1 ring-[#1a1a1f]/10"
          />
        </div>
        <figcaption class="mt-6 text-center lg:mt-8 text-xs uppercase tracking-[0.3em] text-[#1a1a1f]/70">
          Luise Riegel · Wismar
        </figcaption>
      </figure>
    </div>
  </section>
</template>
