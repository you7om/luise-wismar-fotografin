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
      { name: "Jost", provider: "google", weights: ["200"] },
    ],
  },

  // Originalfotos (teils > 10 MB) werden auf die angezeigte Größe verkleinert
  image: {
    quality: 75,
    format: ["webp"],
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
      title: "",
      htmlAttrs: {
        lang: "de",
      },
      meta: [
        { name: "description", content: "" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
});