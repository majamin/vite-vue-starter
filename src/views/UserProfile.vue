<template>
  <div>
    <h1>Welcome: {{ authStore.profile?.first }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();
</script>
