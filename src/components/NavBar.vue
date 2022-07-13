<script setup lang="ts">
import { RouterLink, RouterOptions } from "vue-router";

// Reference: https://vuejs.org/guide/typescript/composition-api.html
const props = defineProps<{ routes?: RouterOptions["routes"] }>();

const mainNavRoutes = props.routes
  ? props.routes.filter((route) => (route.meta ? route.meta.mainNav : false))
  : null;
</script>

<template>
  <div class="mx-auto flex w-60 justify-center text-lg">
    <router-link
      v-for="route in mainNavRoutes"
      class="mr-4"
      :to="{ name: route.name }"
      >{{ route.name }}</router-link
    >
  </div>
</template>

<style scoped lang="postcss">
a {
  @apply relative text-theme-blue-800;
}

a:after {
  @apply absolute -bottom-2 left-0 h-1 w-0 bg-theme-blue-200 transition-all duration-300 content-[""];
}

a:hover:after {
  @apply absolute -bottom-2 left-0 h-1 w-full bg-theme-blue-200 content-[""];
}

a.router-link-active.router-link-exact-active {
  @apply text-theme-blue-700;
}

a.router-link-active.router-link-exact-active:after {
  @apply absolute -bottom-2 left-0 h-1 w-full bg-theme-blue-700 content-[""];
}
</style>
