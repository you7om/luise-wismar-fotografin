<template>
  <section id="kontakt" class="scroll-mt-24 bg-[#fbf7f2]" aria-label="Kontakt">
    <!-- Gleiches Raster wie FAQ und Footer: links 5, rechts 7 Spalten -->
    <div class="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:items-start lg:gap-x-12 2xl:max-w-368">
      <div v-reveal class="max-w-xl lg:col-span-5 lg:max-w-none">
        <h2 class="heading-section">
          Kontakt aufnehmen
        </h2>
        <p class="mt-4 text-pretty text-lg leading-relaxed text-[#1a1a1f]/95">
          Erzählt mir kurz von eurem Anlass, ich melde mich persönlich bei
          euch. Erreichbar bin ich per E-Mail, WhatsApp oder Instagram, ganz
          wie es euch am liebsten ist.
        </p>

        <ul class="mt-8 flex flex-col divide-y divide-[#1a1a1f]/10 border-y border-[#1a1a1f]/10">
          <li v-for="channel in channels" :key="channel.label" class="flex items-center gap-4 py-4">
            <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a85c3f]/10 text-[#a85c3f]">
              <svg v-if="channel.icon === 'whatsapp'" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.482 1.34 4.997L2 22l5.142-1.35a9.96 9.96 0 0 0 4.862 1.24h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.068a9.93 9.93 0 0 0-7.072-2.822zm0 18.174h-.003a8.19 8.19 0 0 1-4.17-1.14l-.299-.177-3.05.8.814-2.973-.195-.306a8.15 8.15 0 0 1-1.253-4.38c0-4.51 3.669-8.178 8.16-8.178a8.1 8.1 0 0 1 5.77 2.394 8.1 8.1 0 0 1 2.389 5.776c0 4.51-3.67 8.178-8.163 8.178z" />
              </svg>
              <svg v-else-if="channel.icon === 'mail'" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 7l8 6 8-6" />
              </svg>
              <svg v-else class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>

            <span class="flex min-w-0 flex-col">
              <span class="text-sm tracking-wide text-[#1a1a1f]/70">{{ channel.label }}</span>
              <span class="flex flex-wrap items-baseline gap-x-3">
                <a
                  :href="channel.href"
                  :target="channel.external ? '_blank' : undefined"
                  :rel="channel.external ? 'noopener noreferrer' : undefined"
                  class="wrap-anywhere text-base font-medium text-[#1a1a1f] transition-colors hover:text-[#a85c3f]"
                >
                  {{ channel.value }}
                </a>
              </span>
            </span>
          </li>
        </ul>
      </div>

      <form
        ref="formEl"
        v-reveal
        class="flex w-full flex-col gap-5 lg:col-span-7"
        action="/kontakt.php"
        method="post"
        :aria-busy="status === 'sending'"
        @submit.prevent="submit"
      >
        <!-- Spam-Schutz: für Menschen unsichtbar, Bots füllen es aus -->
        <div class="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label for="contact-website">Website</label>
          <input id="contact-website" type="text" name="website" tabindex="-1" autocomplete="off">
        </div>
        <input type="hidden" name="t" :value="startedAt">

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label for="contact-name" class="text-sm font-medium text-[#1a1a1f]">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              maxlength="120"
              autocomplete="name"
              required
              class="rounded-lg border border-[#1a1a1f]/15 bg-white px-4 py-3 text-base text-[#1a1a1f] placeholder:text-[#1a1a1f]/40 focus:border-[#a85c3f] focus:outline-none"
            >
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="contact-email" class="text-sm font-medium text-[#1a1a1f]">E-Mail</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              maxlength="200"
              autocomplete="email"
              inputmode="email"
              required
              class="rounded-lg border border-[#1a1a1f]/15 bg-white px-4 py-3 text-base text-[#1a1a1f] placeholder:text-[#1a1a1f]/40 focus:border-[#a85c3f] focus:outline-none"
            >
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="contact-type" class="text-sm font-medium text-[#1a1a1f]">Art des Shootings</label>
          <div class="relative">
            <select
              id="contact-type"
              name="type"
              required
              class="w-full appearance-none rounded-lg border border-[#1a1a1f]/15 bg-white py-3 pl-4 pr-10 text-base text-[#1a1a1f] focus:border-[#a85c3f] focus:outline-none"
            >
              <option value="" disabled selected>Bitte auswählen</option>
              <option>Babybauch-Shooting</option>
              <option>Neugeborenen-Shooting</option>
              <option>Familien-Shooting</option>
              <option>Noch unsicher</option>
            </select>
            <svg class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1a1a1f]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="contact-period" class="text-sm font-medium text-[#1a1a1f]">Wunschzeitraum</label>
          <input
            id="contact-period"
            type="text"
            name="period"
            maxlength="200"
            placeholder="z. B. Mitte Mai bis Juni"
            class="rounded-lg border border-[#1a1a1f]/15 bg-white px-4 py-3 text-base text-[#1a1a1f] placeholder:text-[#1a1a1f]/40 focus:border-[#a85c3f] focus:outline-none"
          >
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="contact-message" class="text-sm font-medium text-[#1a1a1f]">Nachricht</label>
          <textarea
            id="contact-message"
            name="message"
            maxlength="5000"
            rows="5"
            required
            class="resize-none rounded-lg border border-[#1a1a1f]/15 bg-white px-4 py-3 text-base text-[#1a1a1f] placeholder:text-[#1a1a1f]/40 focus:border-[#a85c3f] focus:outline-none"
          />
        </div>

        <p class="-mt-1 text-pretty text-sm leading-relaxed text-[#1a1a1f]/75">
          Mit dem Absenden stimmt ihr der Verarbeitung eurer Daten gemäß der
          <NuxtLink to="/datenschutz" class="underline underline-offset-2 hover:text-[#a85c3f]">Datenschutzerklärung</NuxtLink>
          zu.
        </p>

        <div class="flex flex-col gap-4">
          <button type="submit" class="btn" :disabled="status === 'sending'">
            <svg v-if="status === 'sending'" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.25" stroke-width="2.5" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
            </svg>
            {{ status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden' }}
          </button>

          <div aria-live="polite">
            <p
              v-if="status === 'success'"
              class="text-pretty border-l-2 border-[#5f7a5a] pl-4 text-base leading-relaxed text-[#1a1a1f]"
            >
              Danke für eure Nachricht! Sie ist bei mir angekommen, und ich
              melde mich in den nächsten Tagen persönlich bei euch.
            </p>
            <p
              v-else-if="status === 'error'"
              class="text-pretty border-l-2 border-[#a8402f] pl-4 text-base leading-relaxed text-[#1a1a1f]"
            >
              {{ errorText }} Schreibt mir gern direkt an
              <a :href="mailChannel.href" class="font-medium text-[#a85c3f] underline underline-offset-2">{{ mailChannel.value }}</a>.
            </p>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const channels = [
  {
    label: "E-Mail",
    value: "anfrage@luiseriegelfotografie.de",
    href: "mailto:anfrage@luiseriegelfotografie.de",
    icon: "mail",
    external: false,
  },
  {
    label: "WhatsApp",
    value: "0156 68863978",
    href: "https://wa.me/4915668863978",
    icon: "whatsapp",
    external: true,
  },
  {
    label: "Instagram",
    value: "@luise_riegel_fotografie",
    href: "https://instagram.com/luise_riegel_fotografie",
    icon: "instagram",
    external: true,
  },
];

const mailChannel = channels[0]!;

const formEl = ref<HTMLFormElement>();
const status = ref<"idle" | "sending" | "success" | "error">("idle");
const errorText = ref("");
// Zeitpunkt, ab dem das Formular sichtbar ist (Spam-Schutz in kontakt.php)
const startedAt = ref(0);

onMounted(() => {
  startedAt.value = Date.now();
});

async function submit() {
  if (!formEl.value || status.value === "sending") return;

  status.value = "sending";
  try {
    await $fetch("/kontakt.php", { method: "POST", body: new FormData(formEl.value) });
    status.value = "success";
    formEl.value.reset();
    startedAt.value = Date.now();
  }
  catch (error) {
    const code = (error as { statusCode?: number }).statusCode;
    errorText.value = code === 422
      ? "Bitte prüft eure Angaben, vor allem die E-Mail-Adresse."
      : "Das Senden hat leider nicht geklappt.";
    status.value = "error";
  }
}
</script>
