export default defineNuxtConfig({
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  modules: ["@nuxt/ui", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  css: ["~/assets/css/main.css"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
