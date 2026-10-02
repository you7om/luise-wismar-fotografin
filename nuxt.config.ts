// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image"],

  fonts: {
    families: [
      { name: "Montserrat", provider: "google", weights: ["400 700"] },
      { name: "Parisienne", provider: "google" },
      { name: "Cormorant Garamond", provider: "google", weights: ["300 500"] },
      { name: "Italiana", provider: "google", weights: ["400"] },
    ],
  },

  // Originalfotos (teils > 10 MB) werden auf die angezeigte Größe verkleinert
  image: {
    quality: 75,
    format: ["webp"],
  },

  runtimeConfig: {
    public: {
      // Öffentliche Domain für Canonical-Links, Sitemap und Social-Vorschau
      // (ohne Schrägstrich am Ende). Muss zur Weiterleitung in public/.htaccess passen.
      siteUrl: "https://luiseriegelfotografie.de",
      // Headless WordPress für Impressum und Datenschutz (ohne Schrägstrich am Ende)
      cmsUrl: "https://admin.luiseriegelfotografie.de",
    },
  },

  nitro: {
    prerender: {
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },

  typescript: {
    typeCheck: true,
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "de",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#fbf7f2" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});