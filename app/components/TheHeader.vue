<template>
  <header class="bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-col items-center px-6 py-6 md:px-8 2xl:max-w-368">
      <div class="flex w-full items-center justify-between md:justify-center">
        <NuxtLink to="/" aria-label="Zur Startseite" @click="closeMenu">
          <img
            src="/luise-riegel-fotografie-logo.svg"
            alt="Luise Riegel Fotografie Logo"
            class="h-24 w-auto md:h-28"
          >
        </NuxtLink>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-[#1a1a1f] md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="Menü öffnen oder schließen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg
            v-if="!isMenuOpen"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <nav class="mt-5 hidden md:block" aria-label="Hauptnavigation">
        <ul class="flex items-center justify-center gap-10">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="text-sm tracking-wide text-[#1a1a1f] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-[#1a1a1f]"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <nav
      v-if="isMenuOpen"
      id="mobile-navigation"
      class="border-t border-neutral-200/80 md:hidden"
      aria-label="Hauptnavigation (mobil)"
    >
      <ul class="flex flex-col items-center gap-1 px-6 py-4">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="block py-2 text-sm tracking-wide text-[#1a1a1f] underline decoration-transparent underline-offset-4"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);

const navItems = [
  { label: "Über mich", to: "/#ueber-mich" },
  { label: "Leistungen", to: "/#leistungen" },
  { label: "Portfolio", to: "/#portfolio" },
  { label: "Kontakt", to: "/#kontakt" },
];

function closeMenu() {
  isMenuOpen.value = false;
}
</script>
