<template>
  <footer class="border-t border-[#1a1a1f]/10 bg-[#f3ebe1] text-[#1a1a1f]/95">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between md:px-8 md:py-16 2xl:max-w-368">
      <div class="max-w-xs">
        <NuxtLink to="/" class="text-lg font-medium tracking-wide text-[#1a1a1f]">
          Luise Riegel Fotografie
        </NuxtLink>
        <p class="mt-3 text-pretty text-base leading-relaxed">
          Familienfotografie in Wismar und Umgebung. Natürliche Bilder statt
          steifer Posen.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 md:flex md:gap-24">
        <nav aria-label="Seiten">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-[#2f4a52]">Seiten</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm underline decoration-transparent underline-offset-4 transition-colors hover:text-[#1a1a1f] hover:decoration-[#1a1a1f]"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rechtliches">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-[#2f4a52]">Rechtliches</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="item in legalItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm underline decoration-transparent underline-offset-4 transition-colors hover:text-[#1a1a1f] hover:decoration-[#1a1a1f]"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="border-t border-[#1a1a1f]/10">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-sm text-[#1a1a1f]/70 md:flex-row md:justify-between md:px-8 2xl:max-w-368">
        <p>&copy; {{ year }} Luise Riegel Fotografie</p>
        <p>
          Erstellt von
          <a
            href="https://lumiweb.de"
            target="_blank"
            rel="noopener noreferrer"
            class="underline decoration-transparent underline-offset-4 transition-colors hover:text-[#1a1a1f] hover:decoration-[#1a1a1f]"
          >
            LumiWeb
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();

const navItems = [
  { label: "Über mich", to: "/#ueber-mich" },
  { label: "Leistungen", to: "/#leistungen" },
  { label: "Portfolio", to: "/#portfolio" },
  { label: "Kontakt", to: "/#kontakt" },
];

const legalItems = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
];
</script>
