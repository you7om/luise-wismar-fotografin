<template>
  <section class="bg-white" aria-label="Markenversprechen">
    <div class="mx-auto flex max-w-6xl flex-col items-center px-6 py-12 text-center md:px-8 md:py-16">
      <p v-reveal class="heading-script lg:whitespace-nowrap">
        Natürliche Familienfotos ohne steifes Posieren
      </p>
      <p v-reveal="120" class="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/95">
        Vor meiner Kamera müsst ihr nichts können und nicht perfekt posieren.
        Seid einfach ihr selbst, genau das macht eure Bilder aus.
      </p>
      <p v-reveal="240" class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1a1f] sm:gap-2 sm:text-base">
        <svg class="h-5 w-5 shrink-0 text-[#a85c3f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0 1 18 0Z" />
          <circle cx="12" cy="10" r="2.8" />
        </svg>
        Wismar, Rostock, Schwerin &amp; Lübeck
      </p>
      <NuxtLink v-reveal="360" to="/#kontakt" class="btn mt-8 self-center">
        Shooting anfragen
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
    <div class="border-t border-[#1a1a1f]/10" />
  </section>
</template>
