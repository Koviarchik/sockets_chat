export default defineNuxtConfig({
  target: "static", // Устанавливаем статический режим
  generate: {
    fallback: true  // Если требуется поддержка страниц 404 
  },
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
