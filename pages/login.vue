<script setup>
import { useAuthStore } from "~/stores/auth";
import { useThemeStore } from "~/stores/theme";

const username = ref("");
const authStore = useAuthStore();
const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initializeTheme();
});

function Login() {
  if (username.value.trim()) {
    authStore.login(username.value);
    navigateTo("/");
  }
}


</script>

<template>
  <div class="flex flex-col h-screen w-full dark:bg-gray-900">
    <div class="flex text-6xl font-bold w-full justify-center mt-56">ShishGram</div>
    <div class="flex flex-col justify-center mt-16">
      <div class="flex justify-center text-xl">Login to your account</div>
      <div class="flex justify-center mt-4"><input class="border-2 border-slate-300 rounded-lg w-[250px] p-2 focus:outline-0" v-model="username" placeholder="Write your name..." @keyup.enter="Login" /></div>
    </div>
  </div>
</template>
