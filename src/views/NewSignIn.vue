<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
const email = ref("");
const password = ref("");

import { useAuthStore } from "@/stores/auth";
</script>
<template>
  <div class="mx-auto sm:max-w-screen-sm">
    <div class="mx-4 flex h-full flex-col">
      <div class="mb-8">
        <BaseInput type="email" label="Email" v-model="email" />
      </div>
      <div class="mb-8">
        <BaseInput type="password" label="Password" v-model="password" />
      </div>
      <div class="w-auto">
        <button class="btn btn-indigo">Sign In</button>
      </div>
    </div>
  </div>
</template>
