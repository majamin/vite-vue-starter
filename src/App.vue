<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import gsap from "gsap";

/* Handy references:
 * https://vuejs.org/guide/built-ins/transition.html#javascript-hooks
 * https://greensock.com/cheatsheet/
 */

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
  <NavBar class="mb-14" />
  <router-view v-slot="{ Component, route }">
    <transition @before-enter="beforeEnterView" @enter="enterView" :css="false">
      <component :is="Component" :key="route.fullPath"></component>
    </transition>
  </router-view>
</template>

<style lang="postcss">
code {
  @apply rounded-md bg-[#eee] py-1 px-2 text-[#304455];
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 120px;
}

hr {
  @apply h-[1px] border-none bg-gradient-to-r from-transparent via-theme-blue-600 to-transparent;
}
</style>
