import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      if (process.client) {
        localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");
      }
    },
    applyTheme() {
      const colorMode = useColorMode();
      if (this.isDarkMode) {
        colorMode.value = "dark";
      } else {
        colorMode.value = "light";
      }
    },
    initializeTheme() {
      if (process.client) {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          this.isDarkMode = savedTheme === "dark";
          setTimeout(() => {
            this.applyTheme();
          }, 1);
        }
      }
    },
  },
  
});
