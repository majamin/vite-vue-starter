<template>
  <div class="mx-auto flex w-60 justify-center text-lg">
    <router-link class="mr-4" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="" :to="{ name: 'About' }">About</router-link>
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
