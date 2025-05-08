<script>
export default {
  name: "ChatList",
  props: {
    chats: Array,
  },
  methods: {
    selectChat(chat) {
      this.$emit("chat-selected", {
        id: chat.id,
        name: chat.name,
      });
    },
  },
};
</script>
<script setup>
import { useThemeStore } from '~/stores/theme';
const themeStore = useThemeStore();
onMounted(() => {
  themeStore.initializeTheme();
})
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-100 dark:bg-gray-800 text-black dark:text-white">
    <div class="flex w-full min-w-24 pt-5 pl-2 pb-4 text-xl border-b border-slate-300">
      <p>Chats</p>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-lg hover:bg-slate-200 dark:hover:bg-[#192331] hover:rounded-xl p-2 rounded cursor-pointer w-full justify-center" v-for="chat in chats" :key="chat.id" @click="selectChat(chat)">
        <p>{{ chat.name }}</p>
      </div>
    </div>
  </div>
</template>
