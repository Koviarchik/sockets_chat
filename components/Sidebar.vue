<script setup>
import { useThemeStore } from "~/stores/theme";
const isSidebarOpen = ref(false);
const isSettingsOpen = ref(false);
const authStore = useAuthStore();
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initializeTheme();
});

async function logout() {
  authStore.logout();
  await navigateTo("/login");
}

function toggleTheme() {
  themeStore.toggleTheme();
}
</script>

<template>
  <div class="bg-[#0e1e2a] h-screen text-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden" :class="{ 'w-[200px]': isSidebarOpen, 'w-[65px]': !isSidebarOpen }">
    <div class="flex items-center p-4 border-b border-[#1e2e3a]">
      <div class="cursor-pointer mr-4" @click="isSidebarOpen = !isSidebarOpen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0"> <h2 v-if="isSidebarOpen" class="text-xl font-bold">ShishGram</h2></transition>
    </div>
    <div v-if="isSidebarOpen & !isSettingsOpen" class="px-4 pb-4 overflow-y-auto flex-1" id="noscrlb1">
      <ul class="space-y-4 mt-4">
        <transition appear enter-active-class="transition-all duration-300 ease-out delay-100" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0">
          <li class="hover:bg-[#1e2e3a] p-2 rounded cursor-pointer">Chats</li>
        </transition>
        <transition appear enter-active-class="transition-all duration-300 ease-out delay-200" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0">
          <li class="hover:bg-[#1e2e3a] p-2 rounded cursor-pointer">Contacts</li>
        </transition>
        <transition appear enter-active-class="transition-all duration-300 ease-out delay-300" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0">
          <li class="hover:bg-[#1e2e3a] p-2 rounded cursor-pointer" @click="isSettingsOpen = !isSettingsOpen">Settings</li>
        </transition>
      </ul>
    </div>
    <div class="h-full" v-if="isSettingsOpen & isSidebarOpen">
      <div class="flex items-center p-4 border-b border-[#1e2e3a] cursor-pointer hover:bg-[#1e2e3a]" v-if="isSidebarOpen" @click="isSettingsOpen = !isSettingsOpen">
        <transition appear enter-active-class="transition-all duration-300 ease-out delay-100" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0"
          ><div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span class="pl-4">Back</span>
          </div>
        </transition>
      </div>
      <div class="px-4 pb-4 overflow-y-auto flex-1" id="noscrlb2">
        <ul class="space-y-4 mt-4">
          <transition appear enter-active-class="transition-all duration-300 ease-out delay-100" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0">
            <li class="flex hover:bg-[#1e2e3a] p-2 rounded cursor-pointer flex-row items-center" @click="toggleTheme">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>

              <p class="ml-3">{{themeStore.isDarkMode ? "Dark theme" : "Light theme"}}</p>
            </li>
          </transition>
        </ul>
      </div>
    </div>
    <div class="flex items-center p-4 border-t border-[#1e2e3a] cursor-pointer hover:bg-[#1e2e3a]" v-if="isSidebarOpen" @click="logout()">
      <transition appear enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-x-3" enter-to-class="opacity-100 translate-x-0">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          <span class="pl-4">Quit</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
#noscrlb1::-webkit-scrollbar {
  width: 0%;
}
#noscrlb2::-webkit-scrollbar {
  width: 0%;
}
</style>