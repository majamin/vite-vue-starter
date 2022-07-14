<script setup lang="ts">
/* Handy references:
 * Transitions: https://vuejs.org/guide/built-ins/transition.html#javascript-hooks
 * GreenSock:   https://greensock.com/cheatsheet/
 */

import gsap from "gsap";

import NavBar from "@/components/NavBar.vue";

/* Import routes to pass to navigation */
import { routes } from "./router";

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
  <NavBar class="mb-14" :routes="routes" />
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
</template>
