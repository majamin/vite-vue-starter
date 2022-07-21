<script setup lang="ts">
import { useUserStore } from "@/stores";
import { gsap } from "gsap/all";
import { routes } from "@/router";
import NavBar from "@/components/NavBar.vue";

//import { ref } from "vue";
//import { useUserStore } from "@/stores";
//import gsap from "gsap";
//import NavBar from "@/components/NavBar.vue";

/* Import routes to pass to navigation */

const userStore = useUserStore();

const userPrefersDark = userStore.prefersDark;

// useUserStore().prefersDark;

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
  <main :class="{ dark: userPrefersDark }">
    <NavBar class="z-10 mb-14" :routes="routes" />
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
