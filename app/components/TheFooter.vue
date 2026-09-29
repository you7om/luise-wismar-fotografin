<template>
  <footer class="border-t border-[#a85c3f]/15 bg-[#f1ece8] text-[#1a1a1f]/90">
    <!-- Gleiches Raster wie FAQ und Kontakt: links 5, rechts 7 Spalten -->
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-x-12 2xl:max-w-368">
      <div class="max-w-xl lg:col-span-5 lg:max-w-none">
        <NuxtLink to="/" class="text-lg font-medium tracking-wide text-[#4a2e22]">
          Luise Riegel Fotografie
        </NuxtLink>
        <p class="mt-3 text-pretty text-base leading-relaxed">
          Familienfotografie in Wismar und Umgebung, auch in Rostock, Schwerin
          und Lübeck. Ich begleite euch vom Babybauch bis zum Familienalltag,
          draußen in der Natur oder ganz entspannt bei euch zuhause. Natürliche
          Bilder statt steifer Posen.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-8 sm:flex sm:gap-24 lg:col-span-7 lg:justify-self-end">
        <nav aria-label="Seiten">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-[#8f4a30]">Seiten</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm transition-colors duration-300 hover:text-[#8f4a30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a85c3f]"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Rechtliches">
          <p class="text-xs font-medium uppercase tracking-[0.14em] text-[#8f4a30]">Rechtliches</p>
          <ul class="mt-4 flex flex-col gap-2">
            <li v-for="item in legalItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm transition-colors duration-300 hover:text-[#8f4a30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a85c3f]"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="border-t border-[#a85c3f]/15">
      <div class="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-6 md:gap-3 text-sm text-[#1a1a1f]/70 md:flex-row md:justify-between md:px-8 2xl:max-w-368">
        <p>&copy; {{ year }} Luise Riegel Fotografie. Alle Rechte vorbehalten.</p>
        <a
          href="https://lumiweb.de"
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-[#a85c3f]/35 underline-offset-4 transition-colors duration-300 hover:text-[#8f4a30] hover:decoration-[#8f4a30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a85c3f]"
        >
          Erstellt von LumiWeb
        </a>
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
