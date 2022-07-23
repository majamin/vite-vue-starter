<script setup lang="ts">
//import { ref } from "vue";
import { useUserStore, useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";
import { gsap } from "gsap/all";
import { routes } from "@/router";
import NavBar from "@/components/NavBar.vue";

const authStore = useAuthStore();
const { profile, user } = storeToRefs(authStore);
const userStore = useUserStore();
const { prefersDark } = storeToRefs(userStore);
const toggleDark = userStore.toggleDark;

/* GreenSock handles page transitions */
const beforeEnterView = (el: HTMLDivElement | null) => {
  el ? (el.style.opacity = "0") : null;
  el ? (el.style.transform = "translate(-50px,0)") : null;
};

const enterView = (el: HTMLDivElement | null, done: () => void) => {
  gsap.to(el, {
    duration: 0.5,
    opacity: 1,
    translateX: 0,
    onComplete: done,
  });
};
</script>

<template>
  <main :class="{ dark: prefersDark }">
    <NavBar
      class="z-10 mb-14"
      :routes="routes"
      :dark="prefersDark"
      :loggedIn="authStore.isLoggedIn"
      :displayName="profile && profile.first ? profile.first : null"
      @toggle-dark="toggleDark"
    />
    <div class="mx-auto">
      <router-view v-slot="{ Component, route }">
        <transition
          @before-enter="beforeEnterView"
          @enter="enterView"
          :css="false"
        >
          <component :is="Component" :key="route.fullPath"></component>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style scoped lang="postcss">
#app {
  @apply bg-white dark:bg-gray-800;
}
</style>
