import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: "",
    isAuthenticated: false,
  }),
  actions: {
    login(username: string) {
      this.username = username;
      this.isAuthenticated = true;
    },
    logout() {
      this.username = "";
      this.isAuthenticated = false;
    },
  },
  getters: {
    currentUser: (state) => state.username,
  },
  persist: true,
});
