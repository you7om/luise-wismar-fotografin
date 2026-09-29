<template>
  <div class="bg-white text-[#1a1a1f]">
    <!-- Einleitung -->
    <section class="border-b border-[#1a1a1f]/10">
      <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
        <p class="font-script text-3xl leading-none text-[#a85c3f]">Hallo Luise,</p>
        <h1 class="heading-section mt-3">Das Design deiner Website</h1>
        <p class="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/90">
          Hier findest du auf einen Blick, welche Schriften und Farben deine Website
          verwendet und wie du neue Fotos und Texte vorbereitest. So bleibt alles
          einheitlich, auch wenn später etwas dazukommt.
        </p>

        <nav class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Inhalt dieser Seite">
          <a
            v-for="link in toc"
            :key="link.id"
            :href="`#${link.id}`"
            class="text-[#8f4a30] underline decoration-[#a85c3f]/35 underline-offset-4 transition-colors duration-300 hover:decoration-[#8f4a30]"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </section>

    <!-- Schriften -->
    <section id="schriften" class="scroll-mt-24 bg-[#fbf7f2]" aria-labelledby="schriften-titel">
      <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
        <h2 id="schriften-titel" class="heading-section">Schriften</h2>
        <p class="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/90">
          Vier Schriften, jede mit einer klaren Aufgabe. Alle sind auf der
          Website fest eingebunden, du musst nichts installieren.
        </p>

        <ul class="mt-8 divide-y divide-[#1a1a1f]/10 border-y border-[#1a1a1f]/10 md:mt-10">
          <li
            v-for="font in fonts"
            :key="font.name"
            class="grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <div class="md:col-span-4">
              <p class="text-lg font-medium text-[#1a1a1f]">{{ font.name }}</p>
              <p class="mt-1 text-pretty text-base leading-relaxed text-[#1a1a1f]/80">{{ font.use }}</p>
            </div>
            <p
              class="text-pretty md:col-span-8"
              :class="font.sampleClass"
            >
              {{ font.sample }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Farben -->
    <section id="farben" class="scroll-mt-24" aria-labelledby="farben-titel">
      <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
        <h2 id="farben-titel" class="heading-section">Farben</h2>
        <p class="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#1a1a1f]/90">
          Warme, erdige Töne statt knalliger Farben. Tippe auf eine Farbe, um
          ihren Farbcode zu kopieren, zum Beispiel für Canva oder Instagram.
        </p>

        <div v-for="group in colorGroups" :key="group.title" class="mt-10">
          <h3 class="text-xs font-medium uppercase tracking-[0.14em] text-[#8f4a30]">{{ group.title }}</h3>
          <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            <li v-for="color in group.colors" :key="color.hex">
              <button
                type="button"
                class="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a85c3f]"
                :aria-label="`${color.name}, Farbcode ${color.hex} kopieren`"
                @click="copy(color.hex)"
              >
                <span
                  class="relative block aspect-4/3 rounded-2xl ring-1 ring-[#1a1a1f]/10 transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-0.5"
                  :style="{ backgroundColor: color.hex }"
                >
                  <span
                    class="absolute right-2.5 bottom-2.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-[#1a1a1f] shadow-[0_1px_2px_rgba(143,74,48,0.08),0_6px_16px_-6px_rgba(143,74,48,0.25)] transition-opacity duration-300"
                    :class="copied === color.hex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'"
                    aria-hidden="true"
                  >
                    {{ copied === color.hex ? "Kopiert" : "Kopieren" }}
                  </span>
                </span>
                <span class="mt-3 block text-base font-medium text-[#1a1a1f]">{{ color.name }}</span>
                <span class="block font-mono text-sm text-[#8f4a30]">{{ color.hex }}</span>
                <span class="mt-1 block text-pretty text-sm leading-relaxed text-[#1a1a1f]/75">{{ color.use }}</span>
              </button>
            </li>
          </ul>
        </div>

        <p class="sr-only" aria-live="polite">{{ copied ? `Farbcode ${copied} kopiert` : "" }}</p>
      </div>
    </section>

    <!-- Fotos -->
    <section id="fotos" class="scroll-mt-24 bg-[#fbf7f2]" aria-labelledby="fotos-titel">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:px-8 md:py-16 lg:grid-cols-12 lg:gap-x-12 2xl:max-w-368">
        <div class="max-w-xl lg:col-span-5 lg:max-w-none">
          <h2 id="fotos-titel" class="heading-section">Neue Fotos</h2>
          <p class="mt-4 text-pretty text-lg leading-relaxed text-[#1a1a1f]/90">
            Diese fünf Einstellungen wählst du beim Exportieren, zum Beispiel in
            Lightroom. Dann lädt die Seite schnell, und deine Fotos sind trotzdem
            gestochen scharf.
          </p>

          <!-- Einstellungen als verständliche Schritte statt Fachtabelle -->
          <ol class="mt-8 space-y-6">
            <li v-for="(spec, index) in photoSpecs" :key="spec.label" class="flex gap-4">
              <span class="w-6 shrink-0 text-center font-script text-3xl leading-none text-[#a85c3f]" aria-hidden="true">{{ index + 1 }}</span>
              <div class="min-w-0">
                <p class="text-base text-[#1a1a1f]">
                  <span class="font-medium">{{ spec.label }}:</span>
                  <span class="ml-1 rounded-full bg-[#eadfd2] px-2.5 py-0.5 font-medium whitespace-nowrap text-[#5c3a2a]">{{ spec.value }}</span>
                </p>
                <p class="mt-1.5 text-pretty text-sm leading-relaxed text-[#1a1a1f]/75">{{ spec.hint }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="lg:col-span-7">
          <h3 class="text-xs font-medium uppercase tracking-[0.14em] text-[#8f4a30]">Gut zu wissen</h3>
          <ul class="mt-4 space-y-5">
            <li v-for="tip in photoTips" :key="tip.title" class="flex gap-4">
              <span
                class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                :class="tip.ok ? 'bg-[#a85c3f]/10 text-[#a85c3f]' : 'bg-[#1a1a1f]/5 text-[#1a1a1f]/70'"
                aria-hidden="true"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="tip.ok" d="M5 12.5l4.5 4.5L19 7.5" />
                  <path v-else d="M7 7l10 10M17 7L7 17" />
                </svg>
              </span>
              <p class="text-pretty text-base leading-relaxed text-[#1a1a1f]/80">
                <span class="font-medium text-[#1a1a1f]">{{ tip.title }}</span>
                {{ tip.text }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Hinweise -->
    <section id="hinweise" class="scroll-mt-24" aria-labelledby="hinweise-titel">
      <div class="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 2xl:max-w-368">
        <h2 id="hinweise-titel" class="heading-section">Für neue Texte</h2>
        <ul class="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-3">
          <li v-for="note in textNotes" :key="note.title" class="border-t border-[#a85c3f]/25 pt-4">
            <h3 class="text-base font-medium text-[#1a1a1f]">{{ note.title }}</h3>
            <p class="mt-1.5 text-pretty text-base leading-relaxed text-[#1a1a1f]/80">{{ note.text }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Interne Design-Übersicht für Luise: nicht verlinkt, nicht für Suchmaschinen
useHead({
  title: "Design-Leitfaden · Luise Riegel Fotografie",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const toc = [
  { id: "schriften", label: "Schriften" },
  { id: "farben", label: "Farben" },
  { id: "fotos", label: "Neue Fotos" },
  { id: "hinweise", label: "Für neue Texte" },
];

// Werte aus app/assets/css/main.css und nuxt.config.ts
const fonts = [
  {
    name: "Cormorant Garamond",
    use: "Für alle großen Überschriften. Elegant und ruhig, in dünner Strichstärke.",
    sample: "Haltet eure Momente fest",
    sampleClass: "font-heading text-4xl font-light leading-tight text-[#4a2e22] md:text-5xl",
  },
  {
    name: "Parisienne",
    use: "Schreibschrift für persönliche Akzente, zum Beispiel „Euer Shooting“.",
    sample: "deine Fotografin aus Wismar.",
    sampleClass: "font-script text-4xl leading-tight text-[#4a2e22] md:text-5xl",
  },
  {
    name: "Montserrat",
    use: "Für alle normalen Texte, Buttons und Beschriftungen. Gut lesbar auf jedem Bildschirm.",
    sample: "Vor meiner Kamera müsst ihr nichts können und nicht perfekt posieren. Seid einfach ihr selbst.",
    sampleClass: "text-lg leading-relaxed text-[#1a1a1f]",
  },
  {
    name: "Italiana",
    use: "Nur als Dekoration: dein Name, groß und ganz hell im Hintergrund von „Über mich“.",
    sample: "LUISE",
    sampleClass: "font-display text-5xl uppercase tracking-[0.04em] text-[#4a2e22] md:text-6xl",
  },
];

// Nur Farben, die im Code tatsächlich verwendet werden
const colorGroups = [
  {
    title: "Hauptfarben",
    colors: [
      { name: "Terrakotta", hex: "#a85c3f", use: "Akzentfarbe: Buttons, Icons, Links, Aufzählungszeichen." },
      { name: "Dunkles Terrakotta", hex: "#8f4a30", use: "Schrift in Buttons, Hover-Effekte, kleine Beschriftungen im Footer." },
      { name: "Kakaobraun", hex: "#4a2e22", use: "Alle Überschriften, auch die Schreibschrift." },
      { name: "Fast-Schwarz", hex: "#1a1a1f", use: "Normaler Text. Weicher als reines Schwarz." },
    ],
  },
  {
    title: "Hintergründe",
    colors: [
      { name: "Weiß", hex: "#ffffff", use: "Hintergrund, im Wechsel mit Creme." },
      { name: "Creme", hex: "#fbf7f2", use: "Hintergrund von „Euer Shooting“, Leistungen und Kontakt." },
      { name: "Kartenweiß", hex: "#fdfaf6", use: "Hintergrund der Leistungskarten." },
      { name: "Leinen", hex: "#f1ece8", use: "Hintergrund des Footers ganz unten." },
    ],
  },
  {
    title: "Feine Akzente",
    colors: [
      { name: "Sand", hex: "#eadfd2", use: "Preisfelder („50 €“)." },
      { name: "Hellsand", hex: "#e3d3c1", use: "Feine Kreislinien und Preisfeld beim Darüberfahren." },
      { name: "Nebel", hex: "#f3ebe1", use: "Der große, helle Name im Hintergrund." },
      { name: "Petrol", hex: "#2f4a52", use: "Kleine Zwischentitel der drei Schritte in „Euer Shooting“." },
    ],
  },
];

// Werte entsprechen den verkleinerten Fotos in public/ (2000 px, Startseiten-Karussell 2560 px)
const photoSpecs = [
  {
    label: "Größe",
    value: "2000 Pixel",
    hint: "Gemeint ist die längere Seite des Fotos, egal ob Hoch- oder Querformat. In Lightroom heißt das „Lange Kante“. Nur für die großen Fotos ganz oben auf der Startseite: 2560 Pixel.",
  },
  {
    label: "Dateiart",
    value: "JPEG",
    hint: "Das ganz normale Fotoformat, erkennbar an der Endung .jpg.",
  },
  {
    label: "Qualität",
    value: "80 bis 85",
    hint: "Der Qualitäts-Regler beim Exportieren. Einen Unterschied zu 100 sieht man nicht, die Datei wird aber viel kleiner.",
  },
  {
    label: "Farbeinstellung",
    value: "sRGB",
    hint: "Die Farbeinstellung fürs Internet. Mit einer anderen wirken die Farben im Browser blass. In Lightroom heißt das „Farbraum“.",
  },
  {
    label: "Dateigröße",
    value: "höchstens 1 MB",
    hint: "Das ergibt sich meist von selbst. Ist ein Foto doch größer, den Qualitäts-Regler etwas runter auf 75 stellen.",
  },
];

const photoTips = [
  {
    ok: true,
    title: "Warme, helle Bearbeitung.",
    text: "Passend zur Website. Sehr kühle oder kontrastreiche Fotos fallen aus dem Gesamtbild.",
  },
  {
    ok: true,
    title: "Kurze Bildbeschreibung mitschicken.",
    text: "Ein Satz, was auf dem Foto zu sehen ist. Den lesen Programme für blinde Menschen vor, und er hilft bei Google.",
  },
  {
    ok: true,
    title: "Dazu schreiben, wo das Foto hin soll.",
    text: "Galerie, große Fotos ganz oben auf der Startseite, eine der Leistungen oder „Über mich“.",
  },
  {
    ok: false,
    title: "Keine Originale in voller Größe.",
    text: "Die Seite würde langsam, und deine Fotos wären in Druckqualität herunterladbar.",
  },
  {
    ok: false,
    title: "Nicht per WhatsApp schicken.",
    text: "WhatsApp verkleinert Fotos und macht sie unscharf. Besser gesammelt über einen Link, etwa Google Drive oder WeTransfer.",
  },
];

const textNotes = [
  {
    title: "Persönliche Anrede",
    text: "Die Website spricht Besucher meist mit „ihr“ und „euch“ an, warm und auf Augenhöhe.",
  },
  {
    title: "Deutsche Anführungszeichen",
    text: "„So“ statt \"so\". Und zwischen Zahl und Einheit gehört ein Leerzeichen: 50 €, 20 Bilder.",
  },
  {
    title: "Keine Emojis als Symbole",
    text: "Die Website nutzt feine Linien-Icons in Terrakotta. Emojis würden den ruhigen Stil stören.",
  },
];

// Farbcode kopieren, mit kurzer Bestätigung
const copied = ref<string | null>(null);
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copy(hex: string) {
  try {
    await navigator.clipboard.writeText(hex);
  } catch {
    // Ältere Browser oder fehlende Berechtigung: Code bleibt sichtbar und kann markiert werden
    return;
  }
  copied.value = hex;
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => (copied.value = null), 1600);
}

onBeforeUnmount(() => clearTimeout(resetTimer));
</script>
