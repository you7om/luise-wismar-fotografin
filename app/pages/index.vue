<template>
  <div>
    <HeroGallery />
    <BrandStatement />
    <ShootingExperience />

    <AboutSection />

    <MyServices />
    <Gallery />
    <CallToAction />
    <FaqSection />

    <Contact />
  </div>
</template>

<script setup lang="ts">
const title = "Familienfotografin in Wismar";
const description =
  "Natürliche Familien-, Babybauch- und Neugeborenenfotos in Wismar, Rostock, Schwerin und Lübeck. Entspannte Shootings draußen oder bei euch zuhause.";

useSeoMeta({
  title,
  description,
  ogTitle: `${title} · Luise Riegel Fotografie`,
  ogDescription: description,
});

// Strukturierte Daten für Google: lokales Fotografie-Angebot mit Einzugsgebiet.
// Straße bewusst weggelassen: Privatadresse, steht nur in Impressum und Datenschutz.
const origin = useSiteOrigin();
// Preisspanne aus den Leistungskarten in WordPress, passt sich also bei Preisänderungen an
const { data: leistungen } = useLeistungen();
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: () => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${origin}/#fotografie`,
        name: "Luise Riegel Fotografie",
        description,
        url: `${origin}/`,
        image: `${origin}/og-image.jpg`,
        telephone: "+4915668863978",
        email: "anfrage@luiseriegelfotografie.de",
        // Ohne lesbare Preise fällt das Feld weg (JSON.stringify lässt undefined aus)
        priceRange: preisspanne(leistungen.value ?? []),
        address: {
          "@type": "PostalAddress",
          postalCode: "23966",
          addressLocality: "Wismar",
          addressCountry: "DE",
        },
        areaServed: ["Wismar", "Rostock", "Schwerin", "Lübeck"].map((name) => ({ "@type": "City", name })),
        founder: { "@type": "Person", name: "Luise Riegel", jobTitle: "Fotografin" },
        sameAs: ["https://instagram.com/luise_riegel_fotografie"],
      }),
    },
  ],
});
</script>
