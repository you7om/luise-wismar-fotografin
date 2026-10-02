<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Gemeinsame SEO-Angaben für alle Seiten; Titel und Beschreibung setzt jede Seite selbst
const siteName = "Luise Riegel Fotografie";
const origin = useSiteOrigin();
const route = useRoute();
const canonical = computed(() => origin + (route.path === "/" ? "/" : route.path.replace(/\/$/, "")));

useHead({
  titleTemplate: (title) => (title ? `${title} · ${siteName}` : siteName),
  link: [{ rel: "canonical", href: canonical }],
});

useSeoMeta({
  ogSiteName: siteName,
  ogLocale: "de_DE",
  ogType: "website",
  ogUrl: canonical,
  ogImage: `${origin}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Luise Riegel Fotografie",
  twitterCard: "summary_large_image",
});
</script>
