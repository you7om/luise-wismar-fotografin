<template>
  <section id="ueber-mich" class="relative scroll-mt-24 overflow-hidden bg-white" aria-label="Über Luise">
    <!-- Dekoration: zwei versetzte feine Kreislinien, ragen über den rechten Rand -->
    <svg
      class="pointer-events-none absolute top-1/2 -right-56 hidden w-160 -translate-y-1/2 lg:block 2xl:-right-40 2xl:w-184"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="280" cy="310" r="285" stroke="#e3d3c1" stroke-width="1.5" />
      <circle cx="345" cy="275" r="235" stroke="#e3d3c1" stroke-width="1" />
    </svg>

    <div
      class="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 md:gap-16 md:px-8 md:py-16 lg:grid-cols-12 2xl:max-w-368"
    >
      <!-- Ab lg bestimmt allein der Text die Zeilenhöhe, das Foto füllt sie aus -->
      <div
        class="relative aspect-4/5 w-full ring-1 rounded-lg ring-[#1a1a1f]/10 sm:aspect-4/3 lg:col-span-5 lg:aspect-auto"
      >
        <NuxtImg
          src="/about_photo.jpeg"
          sizes="100vw lg:45vw 2xl:560px"
          alt="Luise Riegel mit Kamera in der Hand, lächelnd im Freien"
          class="absolute inset-0 h-full w-full rounded-lg object-cover object-[50%_30%] lg:object-center"
        />
      </div>

      <div
        class="flex max-w-2xl flex-col lg:col-span-7 lg:max-w-none 2xl:max-w-2xl"
      >
        <div>
          <p
            class="-mt-2 flex flex-wrap items-baseline gap-x-3 text-start leading-none"
          >
            <span
              class="font-heading text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-extralight text-[#4a2e22]"
              >Hey, ich bin</span
            >
            <span
              class="font-script text-[clamp(3.25rem,2.4rem+3.6vw,5rem)] font-normal text-[#4a2e22]"
              >Luise</span
            >
          </p>

          <div
            class="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-[#1a1a1f]/95 lg:text-base xl:text-lg 2xl:text-xl"
          >
            <p>
              Mama von drei Kindern und Fotografin aus Wismar. Meine Kamera
              begleitet mich, seit ich zehn bin. Dass aus dem kleinen Hobby
              einmal so ein wichtiger Teil meines Lebens wird, hätte ich damals
              nicht gedacht.
            </p>
            <p>
              Als dreifache Mama weiß ich, wie schnell die Zeit vergeht. Aus
              kleinen Händen werden große, und aus einem „Das mache ich später“
              wird irgendwann ein „Weißt du noch?“.
            </p>
            <p>
              Deshalb halte ich am liebsten die echten Momente fest: ein
              herzliches Lachen, eine innige Umarmung, kleine Kinderhände, Chaos
              und Nähe. Ich möchte Erinnerungen schaffen, die euch später
              zeigen, wie sich diese Zeit angefühlt hat.
            </p>
            <p>Schön, dass du hier bist.</p>
          </div>
        </div>

        <NuxtLink to="/#kontakt" class="btn mt-8">
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
    </div>
  </section>
</template>
