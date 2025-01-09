// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  imports: {
    autoImport: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    imports: {
      autoImport: false,
    },
  },
  modules: ["vuetify-nuxt-module", "@nuxt/ui", "@pinia/nuxt"],
})