<template>
  <div class="mt-8 max-w-[68ch]" aria-live="polite">
    <!-- Inhalt stammt aus dem eigenen WordPress und gilt deshalb als vertrauenswürdig -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="data" class="cms-inhalt text-base leading-relaxed text-[#1a1a1f]/80" v-html="data.content.rendered" />

    <div v-else-if="status === 'idle' || status === 'pending'" class="motion-safe:animate-pulse" aria-busy="true">
      <span class="sr-only">Inhalte werden geladen …</span>
      <div v-for="n in 3" :key="n" class="mt-8 first:mt-0" aria-hidden="true">
        <div class="h-5 w-56 max-w-full bg-[#f1e9df]" />
        <div class="mt-3 h-4 w-full max-w-2xl bg-[#f6f0e8]" />
        <div class="mt-2 h-4 w-11/12 max-w-xl bg-[#f6f0e8]" />
        <div class="mt-2 h-4 w-2/3 max-w-md bg-[#f6f0e8]" />
      </div>
    </div>

    <div v-else class="text-base leading-relaxed text-[#1a1a1f]/80">
      <p>Die Inhalte können gerade nicht geladen werden.</p>
      <button
        type="button"
        class="mt-2 cursor-pointer text-[#a85c3f] underline decoration-transparent underline-offset-4 hover:decoration-[#a85c3f] focus-visible:decoration-[#a85c3f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a85c3f]"
        @click="refresh()"
      >
        Erneut versuchen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ slug: string }>();

const { data, status, refresh } = useCmsSeite(props.slug);
</script>

<style scoped>
/* WordPress liefert Überschriften und Absätze flach hintereinander.
   Die Abstände entsprechen dem bisherigen Layout (space-y-8 zwischen Abschnitten, mt-2 darunter). */
.cms-inhalt :deep(> :first-child) {
  margin-top: 0;
}

.cms-inhalt :deep(h2) {
  margin-top: 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: #1a1a1f;
  text-wrap: balance;
}

.cms-inhalt :deep(h3) {
  margin-top: 1.5rem;
  font-weight: 500;
  color: #1a1a1f;
  text-wrap: balance;
}

.cms-inhalt :deep(p),
.cms-inhalt :deep(ul),
.cms-inhalt :deep(ol) {
  margin-top: 0.5rem;
  text-wrap: pretty;
  hyphens: auto;
}

.cms-inhalt :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}

.cms-inhalt :deep(ol) {
  list-style: decimal;
  padding-left: 1.25rem;
}

.cms-inhalt :deep(strong) {
  font-weight: 600;
  color: #1a1a1f;
}

.cms-inhalt :deep(a) {
  color: #a85c3f;
  text-decoration-line: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  overflow-wrap: anywhere;
  transition: text-decoration-color 150ms;
}

.cms-inhalt :deep(a:hover),
.cms-inhalt :deep(a:focus-visible) {
  text-decoration-color: #a85c3f;
}

.cms-inhalt :deep(a:focus-visible) {
  outline: 2px solid #a85c3f;
  outline-offset: 2px;
}
</style>
