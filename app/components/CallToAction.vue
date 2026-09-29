<template>
  <section class="border-t border-[#1a1a1f]/10 bg-white" aria-label="Kontakt-Aufruf">
    <div class="mx-auto flex max-w-6xl flex-col items-center px-6 py-12 text-center md:px-8 md:py-16">
      <p v-reveal class="heading-script md:whitespace-nowrap">
        Lass uns eure Geschichte erzählen
      </p>
      <p v-reveal="120" class="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/95">
        Ob Babybauch, Neugeborenes oder ausgelassenes Familienchaos, jeder
        dieser Momente verdient es, in Erinnerung zu bleiben.
      </p>
      <NuxtLink v-reveal="240" to="/#kontakt" class="btn mt-8 self-center">
        Shooting anfragen
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </section>
</template>
