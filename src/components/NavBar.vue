<script setup lang="ts">
import { ref } from "vue";
//import { storeToRefs } from "pinia";
import { RouteRecordName, RouteRecordRaw, RouterLink } from "vue-router";

//import { useUserStore } from "@/stores";
import { useAuthStore } from "@/stores";
const authStore = useAuthStore();

// Reference: https://vuejs.org/guide/typescript/composition-api.html
const props = defineProps<{
  routes: Array<RouteRecordRaw>;
  dark: boolean;
  loggedIn: boolean;
  displayName: string | null;
}>();

const mainNavRoutes: RouteRecordRaw[] | null = props.routes
  ? props.routes.filter((route) => (route.meta ? route.meta.mainNav : false))
  : null;

const mobileMenu = ref<boolean>(false);
const userMenu = ref<boolean>(false);
const subMenu = ref<RouteRecordName | undefined>();

const closeSubMenu = () => (subMenu.value = undefined);
const openSubMenu = (route?: RouteRecordRaw | undefined) => {
  route ? (subMenu.value = route.name) : null;
  // if (route) console.log(typeof route.name);
};
</script>

<template>
  <!-- Using: https://tailwindcomponents.com/component/responsive-navbar-with-dropdown -->
  <nav class="z-100 w-full bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 md:px-4">
    <div class="z-100 mx-auto flex max-w-screen-xl flex-col md:flex-row md:items-center md:justify-between">
      <div class="flex flex-row items-center justify-start md:min-w-fit">
        <!-- LOGO -->
        <router-link :to="{ name: 'Home' }">
          <img class="m-4 w-12 md:pl-0" alt="Logo" src="/assets/images/logo.png" />
        </router-link>
        <!-- COMPANY NAME -->
        <div class="hidden min-w-fit text-left text-lg font-semibold uppercase tracking-widest lg:flex lg:flex-col">
          <span class="mr-2 text-theme-blue-700 dark:text-white">Fire Prevention Officers of</span>
          <span class="text-theme-blue-900 dark:font-bold dark:text-gray-400">British Columbia</span>
        </div>
      </div>
      <!-- MAIN NAVIGATION LINKS -->
      <div :class="{
        absolute: mobileMenu,
        hidden: !mobileMenu,
        'opacity-100': mobileMenu,
      }" class="z-10 w-screen flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0">
        <div class="flex max-w-fit flex-col items-center justify-center" v-for="route in mainNavRoutes"
          @mouseleave="closeSubMenu">
          <!-- SUBNAVIGATION LINKS -->
          <div
            class="relative mt-2 mr-10 max-w-fit cursor-pointer rounded-lg py-2 text-sm font-semibold text-theme-blue-800 dark:text-white md:mt-0 md:ml-4"
            @mouseover="openSubMenu(route)">
            <router-link v-if="!route.children" :to="route.path"
              class="after:absolute after:top-0 after:left-0 after:h-[0.1rem] after:w-0 after:transition-all after:duration-300 after:content-[''] after:hover:absolute after:hover:top-0 after:hover:left-0 after:hover:h-[0.1rem] after:hover:w-full after:hover:bg-theme-blue-200 after:hover:content-[''] dark:after:bg-white">
              {{ route.name }}
            </router-link>
            <div v-else
              class="after:absolute after:top-0 after:left-0 after:h-[0.1rem] after:w-0 after:transition-all after:duration-300 after:content-[''] after:hover:absolute after:hover:top-0 after:hover:left-0 after:hover:h-[0.1rem] after:hover:w-full after:hover:bg-theme-blue-200 after:hover:content-[''] dark:after:bg-white">
              {{ route.name }}
            </div>
            <Transition name="fade">
              <div v-if="subMenu == route.name"
                class="absolute right-0 top-9 z-20 max-h-fit w-full origin-top-right rounded-md bg-gray-50 shadow-lg md:w-48">
                <ul class="flex flex-wrap">
                  <li v-for="subroute in route.children" class="p-6">
                    <router-link :to="subroute.path">
                      {{ subroute.name }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
        <!-- DARK MODE TOGGLE -->
        <!--
        <div class="mr-4 flex w-14 flex-col items-center justify-center">
          <div
            @click="$emit('toggleDark')"
            class="h-6 w-16 cursor-pointer rounded-full bg-gray-100 p-1 shadow-inner shadow-zinc-400"
          >
            <div class="max-w-fit">
              <div
                :class="{
                  'dark:translate-x-10': dark,
                  'translate-x-0': !dark,
                }"
                class="m-0 h-4 w-4 rounded-full bg-gradient-to-r from-white to-gray-100 shadow-sm shadow-zinc-500 transition-all duration-300"
              >
                <div
                  class="h-[0.95rem] w-[0.95em] rounded-full bg-gradient-to-r from-gray-100 to-gray-50"
                ></div>
              </div>
            </div>
          </div>
        </div>
        -->
        <!-- USER LINKS -->
        <div class="relative flex max-w-fit flex-col items-center justify-center md:flex-row">
          <div @mouseleave="userMenu = false" v-if="authStore.isLoggedIn" class="relative mr-4">
            <button @click="
              {
                userMenu = !userMenu;
                subMenu = undefined;
              }
            "
              class="focus:shadow-outline mt-2 items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:mt-0 md:ml-4 md:inline md:w-auto">
              <span>{{ displayName }}</span>
              <svg fill="currentColor" viewBox="0 0 20 20" :class="{ 'rotate-180': userMenu, 'rotate-0': !userMenu }"
                class="mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 md:-mt-1">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
            <Transition name="fade">
              <div v-if="userMenu" class="absolute right-0 w-full origin-top-right rounded-md shadow-lg md:w-48">
                <div class="rounded-md bg-white px-2 py-2 shadow dark:bg-gray-800">
                  <router-link @click="userMenu = false"
                    class="focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:mt-0"
                    :to="{ name: 'UserProfile' }">Profile</router-link>
                  <a class="focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:mt-0"
                    href="#">Link #2</a>
                  <a class="focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white md:mt-0"
                    href="#">Link #3</a>
                </div>
              </div>
            </Transition>
          </div>
          <div class="mx-4">
            <div v-if="!authStore.isLoggedIn">
              <router-link :to="{ name: 'SignIn' }"><button class="btn btn-indigo">Sign In</button></router-link>
            </div>
            <div v-if="authStore.isLoggedIn">
              <button @click="authStore.logoutUser" class="btn btn-indigo">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- OPEN / CLOSE MENU FOR SMALL SCREENS -->
      <button class="focus:shadow-outline absolute right-0 z-20 rounded-lg p-4 focus:outline-none md:hidden"
        @click="mobileMenu = !mobileMenu">
        <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
          <path v-if="!mobileMenu" fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
          <path v-if="mobileMenu" fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
/*** TRANSITIONS ***/
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-300 ease-in;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.slide-enter-active,
.slide-leave-active {
  @apply transition-all duration-300 ease-in;
}

.slide-enter-from {
  @apply translate-x-0;
}

.slide-leave-to {
  @apply translate-x-full;
}
</style>
