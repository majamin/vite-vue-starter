<script setup lang="ts">
import { ref } from "vue";
import { RouteRecordName, RouterLink, RouterOptions } from "vue-router";

// Reference: https://vuejs.org/guide/typescript/composition-api.html
const props = defineProps<{ routes?: RouterOptions["routes"] }>();

const mobileMenu = ref<boolean>(false);

const userMenu = ref<boolean>(false);

const subMenu = ref<RouteRecordName | undefined>();

const mainNavRoutes = props.routes
  ? props.routes.filter((route) => (route.meta ? route.meta.mainNav : false))
  : null;
</script>

<template>
  <!-- Using: https://tailwindcomponents.com/component/responsive-navbar-with-dropdown -->
  <div
    class="dark-mode:text-gray-200 dark-mode:bg-gray-800 w-full bg-white text-gray-700"
  >
    <div
      class="mx-auto flex max-w-screen-xl flex-col px-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="flex flex-row items-center justify-between p-4">
        <router-link :to="{ name: 'Home' }">
          <img
            class="mr-6 w-12"
            alt="Marian Minar Logo"
            src="/assets/images/mm.png"
          />
        </router-link>
        <div class="hidden lg:block">
          <span
            class="dark-mode:text-white focus:shadow-outline rounded-lg text-lg font-semibold uppercase tracking-widest text-theme-blue-600 focus:outline-none"
            >MARIAN</span
          >
          <span
            class="dark-mode:text-white focus:shadow-outline rounded-lg text-lg font-semibold uppercase tracking-widest text-theme-blue-700 focus:outline-none"
          >
            MINAR</span
          >
        </div>
        <button
          class="focus:shadow-outline rounded-lg focus:outline-none md:hidden"
          @click="mobileMenu = !mobileMenu"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="h-6 w-6">
            <path
              v-if="!mobileMenu"
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
            <path
              v-if="mobileMenu"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        :class="{ flex: mobileMenu, hidden: !mobileMenu }"
        class="main-nav flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0"
      >
        <div
          class="main-route relative flex flex-col"
          v-for="route in mainNavRoutes"
        >
          <router-link @mouseover="subMenu = route.name" :to="route.path"
            >{{ route.name }}
          </router-link>
          <Transition name="fade"
            ><div
              @mouseleave="subMenu = undefined"
              v-if="route.children && subMenu == route.name"
              class="subroutes absolute right-0 top-9 max-h-fit w-full origin-top-right rounded-md bg-gray-50 shadow-lg md:w-48"
            >
              <ul class="flex flex-wrap">
                <li v-for="subroute in route.children" class="p-6">
                  <router-link :to="subroute.path">
                    {{ subroute.name }}
                  </router-link>
                </li>
              </ul>
            </div></Transition
          >
        </div>
        <div class="relative mr-4">
          <button
            @click="userMenu = !userMenu"
            class="dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 focus:shadow-outline mt-2 flex w-full flex-row items-center rounded-lg bg-transparent px-4 py-2 text-left text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0 md:ml-4 md:inline md:w-auto"
          >
            <span>Marian</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="{ 'rotate-180': userMenu, 'rotate-0': !userMenu }"
              class="mt-1 ml-1 inline h-4 w-4 transform transition-transform duration-200 md:-mt-1"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <Transition name="fade"
            ><div
              v-if="userMenu"
              class="absolute right-0 mt-2 w-full origin-top-right rounded-md shadow-lg md:w-48"
            >
              <div
                class="dark-mode:bg-gray-800 rounded-md bg-white px-2 py-2 shadow"
              >
                <a
                  class="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
                  href="#"
                  >Link #1</a
                >
                <a
                  class="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
                  href="#"
                  >Link #2</a
                >
                <a
                  class="dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 block rounded-lg bg-transparent px-4 py-2 text-sm font-semibold hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:mt-0"
                  href="#"
                  >Link #3</a
                >
              </div>
            </div></Transition
          >
        </div>
        <div>
          <router-link :to="{ name: 'SignIn' }"
            ><button class="btn btn-indigo">Sign In</button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
/*** MAIN NAVBAR STYLES ***/
.main-nav a {
  @apply relative mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-theme-blue-800 md:mt-0 md:ml-4;
}

.main-nav a:after {
  @apply absolute top-0 left-0 h-[0.1rem] w-0 bg-theme-blue-200 transition-all duration-300 content-[""];
}

.main-nav a:hover:after {
  @apply absolute top-0 left-0 h-[0.1rem] w-full bg-theme-blue-200 content-[""];
}

.main-nav a.router-link-active.router-link-exact-active {
  @apply text-theme-blue-700;
}

.main-nav a.router-link-active.router-link-exact-active:after {
  @apply absolute -bottom-2 left-0 h-[0.1rem] w-full bg-theme-blue-700 content-[""];
}

.main-route .subroutes {
  @apply transition-all duration-300 ease-in-out;
  /* @apply bg-theme-red-100 transition-all duration-300 ease-out; */
}

.main-route:hover .subroutes {
  @apply visible opacity-100;
  /* @apply bg-theme-red-100 transition-all duration-300 ease-out; */
}

/*** TRANSITIONS ***/
.fade-enter-active,
.fade-leave-active {
  @apply transition duration-75 ease-in;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
