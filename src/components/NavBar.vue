<template>
  <div class="flex justify-center w-60 mx-auto text-lg">
    <router-link class="mr-4" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="" :to="{ name: 'About' }">About</router-link>
  </div>
</template>

<style scoped lang="postcss">
a {
  @apply relative text-theme-green-800;
}

a:after {
  @apply transition-all duration-300 content-[""] absolute bg-gray-200 h-1 w-0 -bottom-2 left-0;
}

a:hover:after {
  @apply content-[""] absolute bg-gray-200 h-1 w-full -bottom-2 left-0;
}

a.router-link-active.router-link-exact-active {
  @apply text-theme-green-400;
}

a.router-link-active.router-link-exact-active:after {
  @apply content-[""] absolute bg-theme-green-300 h-1 w-full -bottom-2 left-0;
}
</style>
