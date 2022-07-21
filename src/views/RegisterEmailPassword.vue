<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore, LoginData } from "@/stores/auth";
import BaseInput from "@/components/BaseInput.vue";
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const register = (data: LoginData, firstName: string, lastName: string) =>
  authStore.createAccount(data, firstName, lastName);
</script>
<template>
  <div class="mx-auto sm:max-w-screen-sm">
    <div class="mx-4 flex h-full flex-col">
      <div class="mb-8">
        <BaseInput type="text" label="First Name" v-model="firstName" />
      </div>
      <div class="mb-8">
        <BaseInput type="text" label="Last Name" v-model="lastName" />
      </div>
      <div class="mb-8">
        <BaseInput type="email" label="Email" v-model="email" />
      </div>
      <div class="mb-8">
        <BaseInput type="password" label="Password" v-model="password" />
      </div>
      <div class="w-auto">
        <button
          @click="
            register({ email, password } as LoginData, firstName, lastName)
          "
          class="btn btn-indigo"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
