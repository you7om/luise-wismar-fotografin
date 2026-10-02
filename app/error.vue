<template>
  <NuxtLayout>
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-28 2xl:max-w-368">
        <div class="max-w-3xl">
          <p class="text-xs uppercase tracking-[0.3em] text-[#1a1a1f]/70">
            Fehler {{ statusCode }}
          </p>
          <h1 class="heading-script mt-5">
            {{ isNotFound ? "Diese Seite hat sich versteckt" : "Da ist etwas schiefgelaufen" }}
          </h1>
          <p class="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/95">
            <template v-if="isNotFound">
              Unter dieser Adresse gibt es leider nichts zu sehen. Vielleicht
              hat sich ein Tippfehler eingeschlichen, oder die Seite ist
              umgezogen.
            </template>
            <template v-else>
              Die Seite konnte gerade nicht geladen werden. Versucht es bitte
              in einem Moment noch einmal.
            </template>
          </p>

          <a href="/" class="btn mt-10" @click.prevent="leave('/')">
            Zur Startseite
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <nav class="mt-14 max-w-2xl border-t border-[#1a1a1f]/10 pt-6" aria-label="Weitere Seiten">
            <p class="text-sm tracking-wide text-[#1a1a1f]/70">
              Oder direkt weiter zu
            </p>
            <ul class="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <li v-for="link in links" :key="link.to">
                <a
                  :href="link.to"
                  class="text-base font-medium text-[#1a1a1f] underline decoration-[#a85c3f]/40 underline-offset-4 transition-colors hover:text-[#a85c3f] hover:decoration-[#a85c3f]"
                  @click.prevent="leave(link.to)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const statusCode = computed(() => props.error.statusCode || 500);
const isNotFound = computed(() => statusCode.value === 404);

const links = [
  { label: "Leistungen", to: "/#leistungen" },
  { label: "Portfolio", to: "/#portfolio" },
  { label: "Kontakt", to: "/#kontakt" },
];

// Fehlerzustand zurücksetzen, sonst bleibt Nuxt auf der Fehlerseite stehen
function leave(to: string) {
  clearError({ redirect: to });
}

useSeoMeta({
  // error.vue ersetzt app.vue, die Titelvorlage von dort greift hier nicht
  title: () => `${isNotFound.value ? "Seite nicht gefunden" : "Fehler"} · Luise Riegel Fotografie`,
  robots: "noindex",
});
</script>
