<template>
  <section id="leistungen" class="scroll-mt-24 bg-[#fbf7f2]" aria-label="Meine Leistungen">
    <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
      <h2 class="heading-section md:whitespace-nowrap">
        Haltet eure Momente fest
      </h2>

      <div class="mt-12 grid gap-10 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        <!-- Zwischen sm und lg als Querkarte (Foto links, Text rechts), sonst Hochkarte -->
        <article
          v-for="service in services"
          :key="service.title"
          class="flex h-full flex-col rounded-[1.75rem] bg-[#fdfaf6] p-2.5 pb-7 text-center sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:pb-2.5 lg:flex lg:pb-7 ring-1 ring-[#a85c3f]/10 shadow-[0_1px_2px_rgba(143,74,48,0.06),0_8px_16px_-8px_rgba(143,74,48,0.14),0_24px_40px_-24px_rgba(143,74,48,0.2)]"
        >
          <NuxtImg
            :src="service.photo"
            sizes="100vw sm:40vw lg:33vw 2xl:460px"
            :alt="service.alt"
            :class="service.position"
            class="aspect-6/7 w-full rounded-[1.25rem] rounded-b-[2.5rem] object-cover ring-1 ring-[#1a1a1f]/10 sm:aspect-auto sm:h-0 sm:min-h-full sm:rounded-[1.25rem] lg:aspect-6/7 lg:rounded-b-[2.5rem] lg:h-auto lg:min-h-0"
            loading="lazy"
          />

          <div class="flex flex-1 flex-col items-start px-4 text-left sm:px-6 sm:pb-5 lg:px-4 lg:pb-0">
            <h3 class="mt-6 self-center heading-card text-center">
              {{ service.title }}
            </h3>
            <span class="mt-2 h-px w-10 self-center bg-[#a85c3f]/40" aria-hidden="true" />

            <p class="mt-4 text-pretty text-base leading-relaxed text-[#1a1a1f]/95">
              {{ service.description }}
            </p>
            <ul v-if="service.includes" class="mt-4 space-y-1.5">
              <li v-for="item in service.includes" :key="item.text" class="flex items-center justify-start gap-2.5 text-base text-[#1a1a1f]/95">
                <svg class="h-5 w-5 shrink-0 text-[#a85c3f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <template v-if="item.icon === 'photo'">
                    <rect x="3" y="4" width="18" height="16" rx="2.5" />
                    <circle cx="9" cy="10" r="1.6" />
                    <path d="M21 16l-5-5-8 9" />
                  </template>
                  <template v-else-if="item.icon === 'gallery'">
                    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
                  </template>
                  <template v-else-if="item.icon === 'sun'">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
                  </template>
                  <template v-else>
                    <path d="M3 11l9-7.5 9 7.5" />
                    <path d="M5.5 9.5V20h13V9.5" />
                    <path d="M10 20v-5.5h4V20" />
                  </template>
                </svg>
                {{ item.text }}
              </li>
            </ul>

            <p class="mt-auto self-center pt-6">
              <span class="inline-block rounded-full bg-[#eadfd2] px-9 py-2.5 text-lg font-medium text-[#5c3a2a]">
                ab {{ service.price }}&nbsp;€
              </span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: "Babybauch-Shooting",
    photo: "/Babybauch-Packet.jpeg",
    alt: "Schwangere im schwarzen Kleid hält ihren Babybauch, im Hintergrund das Wasser",
    position: "object-[45%_40%]",
    description:
      "Die letzten Wochen der Schwangerschaft in warmen Bildern. Für euch zwei oder mit der ganzen Familie.",
    includes: [{ icon: "photo", text: "20 bearbeitete Bilder" }, { icon: "gallery", text: "Online-Galerie" }, { icon: "sun", text: "unter freiem Himmel" }],
    price: 50,
  },
  {
    title: "Neugeborenen-Shooting",
    photo: "/Neugeborenen-Packet.jpeg",
    alt: "Schlafendes Neugeborenes im hellen Body auf einer weißen Decke",
    position: "object-[60%_45%]",
    description:
      "Eure ersten Tage zu dritt oder viert, ganz entspannt bei euch zuhause und mit viel Zeit für euch.",
    includes: [{ icon: "photo", text: "20 bearbeitete Bilder" }, { icon: "gallery", text: "Online-Galerie" }, { icon: "home", text: "entspannt bei euch zu Hause" }],
    price: 70,
  },
  {
    title: "Familien-Shooting",
    photo: "/Familien-Packet.jpeg",
    alt: "Eltern küssen sich am Seeufer und halten ihr Kleinkind an den Händen",
    position: "object-[50%_60%]",
    description:
      "Ob am Strand, im Wald oder zuhause: ein Nachmittag voller Momente, so wie ihr sie wirklich erlebt.",
    includes: [{ icon: "photo", text: "20 bearbeitete Bilder" }, { icon: "gallery", text: "Online-Galerie" }, { icon: "sun", text: "unter freiem Himmel" }],
    price: 60,
  },
];
</script>
