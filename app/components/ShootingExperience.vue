<template>
  <section class="bg-[#fbf7f2]" aria-labelledby="shooting-ablauf">
    <!--
      Anordnung wie in der Vorlage: links schmales Hochformat (tiefer),
      Mitte großes Querformat, rechts Hochformat mit gleichem Abstand.
      Überschrift und Schritte ab lg mittig unter dem Querformat.
    -->
    <div
      class="mx-auto grid max-w-6xl grid-cols-[minmax(0,24fr)_minmax(0,52fr)_minmax(0,24fr)] gap-x-1.5 px-6 py-12 md:px-8 md:py-16 lg:gap-x-2.5 2xl:max-w-368"
    >
      <div
        v-reveal
        class="photo-hover relative col-start-1 row-start-1 mt-[18%] hidden aspect-2/3 sm:block ring-1 ring-[#1a1a1f]/10 lg:row-span-2"
      >
        <NuxtImg
          src="/Galerie/DSC_2465.jpeg"
          alt="Hände formen ein Herz auf einem Babybauch"
          sizes="25vw 2xl:340px"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div
        v-reveal
        class="photo-hover relative col-span-3 row-start-1 aspect-4/3 self-start sm:col-span-1 sm:col-start-2 sm:aspect-3/2 ring-1 ring-[#1a1a1f]/10"
      >
        <NuxtImg
          src="/IMG_8740.jpeg"
          alt="Familie sitzt mit ihrem Kleinkind entspannt auf einer Wiese"
          sizes="135vw sm:75vw 2xl:1000px"
          class="absolute inset-0 h-full w-full origin-[50%_22%] scale-[1.35] object-cover"
          loading="lazy"
        />
      </div>

      <div
        v-reveal
        class="photo-hover relative col-start-3 row-start-1 mt-[18%] hidden aspect-2/3 sm:block ring-1 ring-[#1a1a1f]/10 lg:row-span-2"
      >
        <NuxtImg
          src="/Galerie/IMG_9292.jpeg"
          alt="Kleines Mädchen im rosa Kleid mit Sonnenhut steht auf einem Feldweg"
          sizes="25vw 2xl:340px"
          class="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
          loading="lazy"
        />
      </div>

      <div
        class="col-span-3 row-start-2 mt-8 text-center sm:mt-10 lg:col-span-1 lg:col-start-2 lg:mt-8"
      >
        <h2
          id="shooting-ablauf"
          v-reveal
          class="heading-script"
        >
          Euer Shooting
        </h2>

        <ol
          class="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#1a1a1f]/10"
        >
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            v-reveal="150"
            class="flex flex-col items-center px-3"
          >
            <span
              class="font-script text-3xl leading-none text-[#a85c3f]"
              aria-hidden="true"
              >{{ index + 1 }}</span
            >
            <h3
              class="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[#2f4a52]"
            >
              {{ step.title }}
            </h3>
            <p
              class="mx-auto mt-2 max-w-60 text-balance text-sm leading-relaxed text-[#1a1a1f]/80 sm:max-w-none"
            >
              {{ step.text }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "Anfragen",
    text: "Schreibt mir, was ihr euch wünscht, und ich melde mich persönlich bei euch.",
  },
  {
    title: "Shooting",
    text: "Draußen oder bei euch zuhause, ganz entspannt und mit viel Zeit.",
  },
  {
    title: "Eure Bilder",
    text: "Eure fertigen Bilder bekommt ihr in einer eigenen Online-Galerie.",
  },
];
</script>
