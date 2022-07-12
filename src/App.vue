<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <NavBar />
  <router-view></router-view>
</template>

<style lang="postcss">
a {
  @apply text-theme-green-800;
}

a.router-link-active.router-link-exact-active {
  @apply text-theme-green-400;
}

code {
  @apply bg-[#eee] py-1 px-2 rounded-md text-[#304455];
}

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 120px;
}
</style>
