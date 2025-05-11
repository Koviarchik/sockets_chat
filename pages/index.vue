<script setup>
definePageMeta({
  middleware: ["auth"],
});

import { io } from "socket.io-client";
import { useThemeStore } from "~/stores/theme";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const messages = ref([]);
const selectedChat = ref(null);
const username = ref(authStore.username);
const text = ref("");
const socket = ref(null);
const connect = ref(false);
const users = ref([]);
const chatHistory = ref({});

function setSelectedChat(chat) {
  selectedChat.value = chat;
  loadMessages();
}

async function loadMessages() {
  const chatKey = `${username.value}_${selectedChat.value.name}`;
  const cached = localStorage.getItem(`chat_${chatKey}`);
  if (cached) {
    messages.value = JSON.parse(cached);
  }
  const { data } = await useFetch(`/api/messages/${username.value}?receiver=${selectedChat.value.name}`);
  if (data.value) {
    messages.value = data.value;
    localStorage.setItem(`chat_${chatKey}`, JSON.stringify(data.value));
    chatHistory.value[chatKey] = data.value;
  }
}

async function loadUsers() {
  const { data } = await useFetch("/api/users");
  if (data.value) {
    users.value = data.value
      .map((user) => user.username)
      .filter((username) => username !== authStore.username)
      .map((name, index) => ({ id: index + 1, name }));
  }
}

function handleConnect() {
  if (username.value.length > 0) {
    socket.value = io("ws://localhost:3000");
    socket.value.emit("logged_in", { username: username.value });

    socket.value.on("connect", () => {
      loadUsers();
    });

    socket.value.on("users_updated", (updatedUsers) => {
      users.value = updatedUsers
        .map((user) => user.username)
        .filter((username) => username !== authStore.username)
        .map((name, index) => ({ id: index + 1, name }));
    });

    socket.value.off("chat message");

    socket.value.on("chat message", (data) => {
      if (selectedChat.value && [data.sender, data.receiver].includes(selectedChat.value.name)) {
        const isDuplicate = messages.value.some((m) => m.text === data.text && m.sender === data.sender && Math.abs(new Date(m.createdAt) - new Date(data.createdAt)) < 1000);
        if (!isDuplicate) {
          messages.value = [...messages.value, data];
        }
      }
    });
  }
}

function sendMessage(messageData) {
  const tempId = `temp-${Date.now()}`;

  messages.value = [
    ...messages.value,
    {
      ...messageData,
      id: tempId,
      isPending: true,
      createdAt: new Date(),
    },
  ];

  socket.value.emit(
    "chat message",
    {
      sender: messageData.sender,
      text: messageData.text,
      receiver: messageData.receiver,
    },
    (response) => {
      if (response.status === "delivered") {
        const index = messages.value.findIndex((m) => m.id === tempId);
        if (index !== -1) {
          messages.value[index] = {
            ...messages.value[index],
            id: response.id,
            isPending: false,
          };
          messages.value = [...messages.value];
        }
      }
    }
  );
}

onMounted(() => {
  loadUsers();
  handleConnect();
  themeStore.initializeTheme();
  console.log("Изменение")
});
</script>

<template>
  <div class="flex dark:bg-gray-900">
    <Sidebar />
    <div class="flex grow">
      <ChatList :chats="users" @chat-selected="setSelectedChat" />
      <ChatWindow v-if="selectedChat" :chat="selectedChat" :messages="messages" @send-message="sendMessage" />
      <div class="flex w-full justify-center items-center" v-if="!selectedChat">
        <div class="text-xl text-slate-300">In our innovative social network you can communicate with all users</div>
      </div>
    </div>
  </div>
</template>
