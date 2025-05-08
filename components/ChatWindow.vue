<script setup>
const props = defineProps({
  chat: Object,
  messages: Array,
});
import { useThemeStore } from "~/stores/theme";
const emit = defineEmits(["send-message"]);
const authStore = useAuthStore();
const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initializeTheme();
});
const newMessage = ref("");

function sendMessage() {
  if (newMessage.value.trim() !== "") {
    emit("send-message", {
      text: newMessage.value,
      receiver: props.chat.name,
      sender: authStore.username,
    });
    newMessage.value = "";
  }
}
</script>

<template>
  <div class="flex flex-col w-full h-screen text-black dark:text-white">
    <div class="flex justify-center bg-slate-50 dark:bg-[#192331] p-2 shrink-0">{{ chat.name }}</div>
    <div class="flex-1 overflow-y-auto overflow-x-hidden" id="msgscb">
      <div class="flex flex-col space-y-2 p-4">
        <div class="p-2 bg-slate-100 dark:bg-gray-800 w-fit rounded-full ml-2" v-for="message in messages" :key="message.id">{{ message.sender }}: {{ message.text }}</div>
      </div>
    </div>
    <div class="flex w-full bg-slate-50 dark:bg-[#192331] h-12 shrink-0">
      <input class="w-full bg-slate-50 dark:bg-[#192331] p-4 focus:outline-0" placeholder="Write a message..." v-model="newMessage" @keyup.enter="sendMessage" />
      <button class="text-slate-300 dark:text-slate-500 pl-2 pr-2 cursor-pointer" @click="sendMessage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
#msgscb::-webkit-scrollbar {
  width: 0%;
}
</style>
